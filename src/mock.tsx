import Mock from 'mockjs'

const domain_client = '/api_client/'

// 模拟login接口
Mock.mock(domain_client + 'login', () => {
    const result = {
        code: 200,
        message: 'OK',
        data: {
            loginUid: 10000,
            nickname: '兔子先生',
            token: 'yyds2025',
        },
    }
    return result
})