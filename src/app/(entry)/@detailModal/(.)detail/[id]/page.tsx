import { Suspense } from 'react'
import { Descriptions, Modal } from 'antd'
import type { DescriptionsProps } from 'antd'
import CloseButton from './closeButton'
import Loading from '@/components/loading'
import { apiReqs } from '@/api/server'

export default async function DetailModal({
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

            return <Descriptions column={1} bordered items={items} />
        }
        return response.message
    }

    // Modal的标题栏
    const TitleBar = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>文章标题</span>
                <CloseButton />
            </div>
        )
    }

    return (
        <Modal
            title={<TitleBar />}
            open={true}
            width={800}
            styles={{ body: { minHeight: 500 } }}
            footer={null}
            closable={false}
        >
            <Suspense fallback={<Loading />}>
                <ArticleDetail />
            </Suspense>
        </Modal>
    )
}