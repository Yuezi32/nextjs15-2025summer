'use client'

import { useState } from 'react'
import { Button } from 'antd'

export default function FakeError({
    message = '这是一个模拟异常',
}: {
    message?: string
}) {
    const [error, setError] = useState(false)

    if (error) {
        // 抛出异常
        throw new Error(message)
    }

    return <Button type="primary" onClick={()=>{setError(true)}}>模拟异常</Button>
}