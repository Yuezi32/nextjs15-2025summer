import { Suspense } from 'react'
import Link from 'next/link'
import { Button, Card, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import Loading from '@/components/loading'
import { apiReqs } from '@/api/server'

export default async function Detail({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    // 获取id
    const { id } = await params
    const ArticleDetail = async () => {
        // 由服务端调用API获取数据
        const response = await apiReqs.getArticleDetail({ id })

        if (response.success) {
            const items: DescriptionsProps['items'] = [
                {
                    key: 'title',
                    label: '文章标题',
                    children: response.data.title,
                },
                {
                    key: 'pubDate',
                    label: '发布时间',
                    children: response.data.pubDate,
                },
                {
                    key: 'content',
                    label: '文章内容',
                    children: response.data.content,
                },
            ]

            return (
                <Descriptions
                    title="文章详情"
                    column={1}
                    bordered
                    items={items}
                />
            )
        }
        return response.message
    }

    return (
        <Card className="M-detail">
            <div style={{ marginBottom: 20 }}>
                <Link href={{ pathname: '/home' }}>
                    <Button type="primary">返回首页</Button>
                </Link>
            </div>
            <Suspense fallback={<Loading />}>
                <ArticleDetail />
            </Suspense>
        </Card>
    )
}