'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
// 只在开发环境引入Mockjs
// if (process.env.NODE_ENV === 'development') {
    import('@/mock')
// }
import axios from 'axios'
import { Modal } from 'antd'
import { globalConfig } from '@/globalConfig'

// 开发环境地址
let API_DOMAIN = '/api_client/'
if (process.env.NODE_ENV === 'production') {
    // 正式环境地址（请根据实际情况修改）
    API_DOMAIN = '/api_client/'
}

// 用户登录信息在localStorage中存放的名称
export const SESSION_LOGIN_INFO = globalConfig.SESSION_LOGIN_INFO

// API请求正常，数据正常
export const API_CODE = {
    // API请求正常
    OK: 200,
    // API请求正常，数据异常
    ERR_DATA: 403,
    // API请求正常，空数据
    ERR_NO_DATA: 301,
    // API请求正常，登录异常
    ERR_LOGOUT: 401,
}

// API请求异常统一报错提示
export const API_FAILED = '网络连接异常，请稍后再试'
export const API_LOGOUT = '您的账号已在其他设备登录，请重新登录'

export const apiReqs = {
    // 登录
    signIn: (config: any) => {
        axios
            .post(API_DOMAIN + 'login', config.data)
            .then((res) => {
                const result = res.data
                if (config.done) config.done(result)
                if (result.code === API_CODE.OK) {
                    // 成功后将登录信息存入localStorage和cookie
                    window.localStorage.setItem(
                        SESSION_LOGIN_INFO,
                        JSON.stringify({
                            uid: result.data.loginUid,
                            nickname: result.data.nickname,
                            token: result.data.token,
                        })
                    )
                    document.cookie = `uid=${result.data.loginUid}; path=/`
                    document.cookie = `token=${result.data.token}; path=/`
                    if (config.success) config.success(result)
                } else {
                    if (config.fail) config.fail(result)
                }
            })
            .catch(() => {
                if (config.done) config.done()
                if (config.fail)
                    config.fail({
                        message: API_FAILED,
                    })
                Modal.error({
                    title: '登录失败',
                })
            })
    },
    // 登出（登出后将登录信息从localStorage删除）
    signOut: () => {
        const { uid, token } = getLocalLoginInfo()
        const headers = {
            loginUid: uid,
            'access-token': token,
        }
        const axiosConfig = {
            method: 'post',
            url: API_DOMAIN + 'logout',
            headers,
        }
        axios(axiosConfig)
            .then(() => {
                logout()
            })
            .catch(() => {
                logout()
            })
    },
}

// 从localStorage获取用户信息
export function getLocalLoginInfo() {
    const loginInfo = window.localStorage.getItem(SESSION_LOGIN_INFO)
    if (!loginInfo) return { uid: null, nickname: null, token: null }
    return JSON.parse(loginInfo)
}

// 退出登录
export function logout() {
    // 清除localStorage和cookie中的登录信息
    window.localStorage.removeItem(SESSION_LOGIN_INFO)
    document.cookie = 'uid=; path=/; Max-Age=0'
    document.cookie = 'token=; path=/; Max-Age=0'
    // 跳转至Login页面
    window.location.href = '/login'
}

/*
 * API请求封装（带验证信息）
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 */
export function apiRequest(config: any) {
    const loginInfo = JSON.parse(
        window.localStorage.getItem(SESSION_LOGIN_INFO) || ''
    )
    if (config.data === undefined) {
        config.data = {}
    }
    config.method = config.method || 'post'

    // 封装header信息
    const headers: any = {
        loginUid: loginInfo ? loginInfo.uid : null,
        'access-token': loginInfo ? loginInfo.token : null,
    }

    let data: any = null

    // 判断是否使用formData方式提交
    if (config.formData) {
        headers['Content-Type'] = 'multipart/form-data'
        data = new FormData()
        Object.keys(config.data).forEach(function (key) {
            data.append(key, config.data[key])
        })
    } else {
        data = config.data
    }

    // 组装axios数据
    const axiosConfig: any = {
        method: config.method,
        url: config.url,
        headers,
    }

    // 判断是get还是post，并加入发送的数据
    if (config.method === 'get') {
        axiosConfig.params = data
    } else {
        axiosConfig.data = data
    }

    // 发起请求
    axios(axiosConfig)
        .then((res) => {
            const result = res.data
            if (config.done) config.done()

            if (result.code === API_CODE.ERR_LOGOUT) {
                // 如果是登录信息失效，则弹出Antd的Modal对话框
                Modal.error({
                    title: result.message,
                    // 点击OK按钮后，直接跳转至登录界面
                    onOk: () => {
                        logout()
                    },
                })
            } else {
                // 如果登录信息正常，则执行success的回调
                if (config.success) config.success(result)
            }
        })
        .catch(() => {
            // 如果接口不通或出现错误，则弹出Antd的Modal对话框
            Modal.error({
                title: API_FAILED,
            })
            // 执行fail的回调
            if (config.fail) config.fail()
            // 执行done的回调
            if (config.done) config.done()
        })
}