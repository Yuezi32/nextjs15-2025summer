import { Card } from 'antd'

export default function Company1({ children }: { children: React.ReactNode }) {
    return <Card className="M-company1">公司B：{children}</Card>
}