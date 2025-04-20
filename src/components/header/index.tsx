'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Card, Dropdown, Modal } from 'antd'
import {
    ExportOutlined,
    CaretDownOutlined,
    SunOutlined,
    MoonOutlined,
    BgColorsOutlined,
} from '@ant-design/icons'
import ThemeModal from '@/components/themeModal'
import { globalConfig } from '@/globalConfig'
import { logout, getLocalLoginInfo } from '@/api/client'
import { useTheme } from '@/components/themeContext'
import logoImg from '@/common/images/logo.png'
import './header.scss'

export default function Header() {
    // 引入主题上下文的hook
    const { dark, setDark } = useTheme()

    // 是否显示主题色Modal
    const [showThemeModal, setShowThemeModal] = useState(false)

    // Antd的Modal组件API
    const [modal, contextHolder] = Modal.useModal()

    // localStorage中保存的用户信息
    const [loginInfo, setLoginInfo] = useState<{
        uid?: string
        nickname?: string
        token?: string
    } | null>(null)

    // 组件加载后，用localStorage中读取用户信息
    useEffect(() => {
        setLoginInfo(getLocalLoginInfo())
    }, [])

    // 退出登录
    const exit = () => {
        modal.confirm({
            title: '确定要退出系统么？',
            okText: '退出',
            onOk: () => {
                logout()
            },
        })
    }

    const menuItems = [
        {
            label: '退出登录',
            key: 'exit',
            icon: <ExportOutlined />,
            onClick: exit,
        },
    ]

    return (
        <Card className="M-header">
            <div className="header-wrapper">
                <div className="logo-con">
                    <Image src={logoImg} alt="" width={32} height={32} />
                    <span className="logo-text">Next.js APP</span>
                </div>
                <div className="header-con">
                    {dark ? (
                        <Button
                            icon={<SunOutlined />}
                            shape="circle"
                            onClick={() => {
                                setDark(false)
                            }}
                        ></Button>
                    ) : (
                        <Button
                            icon={<MoonOutlined />}
                            shape="circle"
                            onClick={() => {
                                setDark(true)
                            }}
                        ></Button>
                    )}

                    {globalConfig.customColorPrimarys &&
                        globalConfig.customColorPrimarys.length > 0 && (
                            <Button
                                icon={<BgColorsOutlined />}
                                shape="circle"
                                onClick={() => {
                                    setShowThemeModal(true)
                                }}
                            ></Button>
                        )}

                    {loginInfo && (
                        <Dropdown menu={{ items: menuItems }}>
                            <div className="user-menu">
                                <span>{loginInfo.nickname}</span>
                                <CaretDownOutlined className="arrow" />
                            </div>
                        </Dropdown>
                    )}
                </div>
            </div>

            {showThemeModal && (
                <ThemeModal
                    onClose={() => {
                        setShowThemeModal(false)
                    }}
                />
            )}

            {contextHolder}
        </Card>
    )
}
