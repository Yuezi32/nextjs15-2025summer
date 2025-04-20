// 开发环境地址
const API_DOMAIN_SERVER_DEV = 'http://localhost:3000/api_server_mock/'
// 生产环境地址（请根据实际情况修改）
const API_DOMAIN_SERVER_PRODUCTION = 'http://localhost:3000/api_server_mock/'

export const API_DOMAIN_SERVER =
    process.env.NODE_ENV === 'development'
        ? API_DOMAIN_SERVER_DEV
        : API_DOMAIN_SERVER_PRODUCTION

export const apiReqs = {
    // 获取文章列表
    getArticleList: async ({ options }: { options?: RequestInit } = {}) => {
        return await serverRequest({
            url: API_DOMAIN_SERVER + 'getArticleList',
            options,
        })
    },

    // 获取文章详情
    getArticleDetail: async ({ id }: { id: string }) => {
        return await serverRequest({
            url: API_DOMAIN_SERVER + 'getArticleDetail/' + id,
        })
    },

    // 更多接口补充在这里...
}

// 等待延迟（用于调式Suspense的fallback组件）,毫秒
const DELAY = 2000
const waitDelay = () => new Promise((resolve) => setTimeout(resolve, DELAY))

/* API请求封装
 * url: [必须]请求url
 * options: 请求头、请求体等可选配置
 */
const serverRequest = async ({
    url,
    options,
}: {
    url: string
    options?: RequestInit
}) => {
    // 模拟延迟
    if (DELAY) {
        await waitDelay()
        // 强制fetch不缓存数据
        options = { ...options, cache: 'no-store' }
    }

    try {
        const res = await fetch(url, options)
        const result = await res.json()

        if (result.code === 200) {
            return { success: true, data: result.data }
        } else {
            return { success: false, message: result.message }
        }
    } catch (error) {
        return { success: false, message: '网络错误：' + error }
    }
}
