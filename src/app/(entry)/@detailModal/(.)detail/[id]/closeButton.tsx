'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'antd'
export default function CloseButton() {
    // 路由hook
    const router = useRouter()

    return (
        <Button
            onClick={() => {
                //返回上一个页面
                router.back()
            }}
        >
            关闭
        </Button>
    )
}