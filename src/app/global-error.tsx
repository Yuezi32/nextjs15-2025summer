'use client' // 异常页面必须是客户端组件

import { Button, Result } from 'antd'
import styles from './global-error.module.scss'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <div className={styles['P-global-error']}>
                    <Result
                        status="500"
                        title="服务器开小差了~"
                        subTitle={error.message}
                        extra={
                            <Button type="primary" onClick={() => reset()}>
                                再试一次
                            </Button>
                        }
                    />
                </div>
            </body>
        </html>
    )
}