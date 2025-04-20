'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button, Form, Input } from 'antd'
import { apiReqs } from '@/api/client'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import imgLogo from '@/common/images/logo.png'
import imgCover from './cover.svg'
import './login.scss'

export default function Login() {
    // 路由hook
    const router = useRouter()

    // 登录按钮loading状态
    const [loading, setLoading] = useState(false)

    // 提交登录
    const loginSubmit = (values: { account: string; password: string }) => {
        setLoading(true)

        const data = {
            account: values.account,
            password: values.password,
        }

        apiReqs.signIn({
            data,
            success: () => {
                // 跳转路由地址
                router.push('/')
            },
        })
    }

    return (
        <div className="P-login">
            <div className="login-con">
                <div className="cover-con">
                    <Image
                        src={imgLogo}
                        alt=""
                        className="img-logo"
                        width={60}
                        height={60}
                    />
                    <h2>Next.js APP</h2>
                    <Image
                        src={imgCover}
                        alt=""
                        className="img-cover"
                        width={300}
                        height={270}
                        priority
                    />
                    <div className="m-footer">公众号：卧梅又闻花</div>
                </div>
                <div className="pannel-con">
                    <h3>Welcome!</h3>
                    <p className="subtext">请登录您的账号</p>
                    <Form onFinish={loginSubmit}>
                        <Form.Item
                            name="account"
                            rules={[
                                { required: true, message: '请输入您的账号' },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="请输入账号"
                                prefix={<UserOutlined />}
                                autoComplete="account"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码',
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="请输入密码"
                                prefix={<KeyOutlined />}
                                autoComplete="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block={true}
                                loading={loading}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}