import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { App, Layout } from 'antd'
import Header from '@/components/header'
import Sider from '@/components/sider'

// 路由守卫，从cookies中判断用户是否登录
async function privateRoute() {
    // 获取cookies
    const cookieStore = await cookies()
    // 从cookies中获取uid和token
    const uid = cookieStore.get('uid')?.value
    const token = cookieStore.get('token')?.value
    //如果cookies中没有uid和token则直接跳转至Login页面
    if (!uid || !token) {
        // 路由跳转
        redirect('/login')
    }
}

export default async function Entry({
    children,
    detailModal,
}: Readonly<{
    children: React.ReactNode
    detailModal: React.ReactNode
}>) {
    // 路由守卫：登录鉴权
    await privateRoute()

    return (
        <App className="G-fullpage">
            <Layout>
                <Header />
                <Layout
                    style={{
                        flexDirection: 'row',
                        overflow: 'hidden',
                        flex: 1,
                    }}
                >
                    <Sider />
                    <div style={{ overflow: 'auto', flex: 1, padding: 10 }}>
                        {children}
                        {detailModal}
                    </div>
                </Layout>
            </Layout>
        </App>
    )
}
