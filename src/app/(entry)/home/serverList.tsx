import { Suspense } from 'react'
import Link from 'next/link'
import { Card } from 'antd'
import Loading from '@/components/loading'
import { apiReqs } from '@/api/server'
import styles from './serverList.module.scss'

type ItemType = {
    id: number
    title: string
}

export default async function ServerList() {
    // 异步加载列表数据及组件
    const List = async () => {
        // 由服务端调用API获取数据
        const response = await apiReqs.getArticleList()

        if (response.success) {
            // 遍历数据列表中的每一条记录，并渲染
            return response.data.list.map((item: ItemType, index: number) => {
                return (
                    <div className={styles['item-con']} key={index}>
                        <div className={styles['col-id']}>{item.id}</div>
                        <div className={styles['col-title']}>
                            <Link
                                href={{
                                    pathname: '/detail/' + item.id,
                                }}
                            >
                                {item.title}
                            </Link>
                        </div>
                    </div>
                )
            })
        }
        return response.message
    }

    return (
        <Card className={styles['M-serverList']} title="服务端获取数据列表">
            <Suspense fallback={<Loading />}>
                <List />
            </Suspense>
        </Card>
    )
}