'use client'

import '@ant-design/v5-patch-for-react-19'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, theme } from 'antd'
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN'

const { darkAlgorithm, defaultAlgorithm } = theme
import { useTheme } from '@/components/themeContext'

export default function AntdClientProvider({
    children,
}: {
    children: React.ReactNode
}) {
    // 引入主题上下文的hook
    const { dark, colorPrimary } = useTheme()

    // Ant Design主题
    const antdTheme: Parameters<typeof ConfigProvider>[0]['theme'] = {
        algorithm: dark ? darkAlgorithm : defaultAlgorithm,
        token: colorPrimary ? { colorPrimary } : undefined,
    }

    return (
        <AntdRegistry>
            <ConfigProvider locale={zhCN} theme={antdTheme}>
                {children}
            </ConfigProvider>
        </AntdRegistry>
    )
}
