'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Layout, Menu, ConfigProvider, theme } from 'antd'
import type { MenuProps } from 'antd'
import { useTheme } from '@/components/themeContext'
import { globalConfig } from '@/globalConfig'
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons'
import './sider.scss'

const AntdSider = Layout.Sider
type MenuItem = Required<MenuProps>['items'][number]

const { darkAlgorithm, defaultAlgorithm } = theme
const { useToken } = theme

export default function Sider() {
    // 引入主题上下文的hook
    const { dark } = useTheme()

    // Sider的主题色，默认：light
    let siderTheme = defaultAlgorithm
    // 如果全局配置了强制Sider为dark
    if (globalConfig.siderTheme === 'dark') {
        siderTheme = darkAlgorithm
    }
    // 如果全局配置了Sider跟随主题色
    else if ((globalConfig.siderTheme = 'theme')) {
        siderTheme = dark ? darkAlgorithm : defaultAlgorithm
    }

    // Antd的主题色hook
    const { token } = useToken()

    // 当前路由地址
    const pathname = usePathname()

    // 路由hook
    const router = useRouter()

    // 左侧导航的开合状态
    const [collapsed, setCollapsed] = useState(false)

    // 左侧导航列表
    const items: MenuItem[] = [
        {
            label: '首页',
            key: '/home',
            icon: <HomeOutlined />,
        },
        {
            label: '关于我们',
            key: '/about',
            icon: <UserOutlined />,
        },
    ]

    // Menu中每个item的点击事件
    const onItemClick: MenuProps['onClick'] = (item) => {
        // 路由跳转
        router.push(item.key)
    }

    // 切换左侧导航开合状态
    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    // 左侧导航展开时的宽度
    const fullWidth = 200
    // 左侧导航收起时的宽度
    const collapsedWidth = 49

    return (
        <ConfigProvider
            theme={{
                algorithm: siderTheme,
            }}
        >
            <AntdSider
                className="M-sider"
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={collapsedWidth}
                width={fullWidth}
                style={{
                    backgroundColor: token.colorBgContainer,
                    borderColor: token.colorBorderSecondary,
                }}
            >
                <div className="sider-main">
                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={items}
                        className="sider-menu"
                        onClick={onItemClick}
                    ></Menu>
                    <div
                        className="sider-footer"
                        onClick={onCollapse}
                        style={{
                            color: token.colorTextBase,
                            borderTopColor: token.colorBorder,
                        }}
                    >
                        {collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )}
                    </div>
                </div>
            </AntdSider>
        </ConfigProvider>
    )
}
