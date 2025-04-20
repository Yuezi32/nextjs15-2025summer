import Link from 'next/link'
import { Button, Card } from 'antd'

export default function About() {
    return (
        <Card>
            <div style={{ display: 'flex', gap: 10 }}>
                <Link href={{ pathname: '/about' }}>
                    <Button type="primary">地址</Button>
                </Link>
                <Link href={{ pathname: '/about/tel' }}>
                    <Button type="primary">电话</Button>
                </Link>
                <Link href={{ pathname: '/about/email' }}>
                    <Button type="primary">邮箱</Button>
                </Link>
            </div>
        </Card>
    )
}