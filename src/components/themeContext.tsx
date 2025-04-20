'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { globalConfig } from '@/globalConfig'

const ThemeContext = createContext<{
    dark: boolean
    setDark: (dark: boolean) => void
    colorPrimary: string | null
    setColorPrimary: (color: string | null) => void
}>({
    // 当前深色模式
    dark: false,
    // 设置是否深色模式
    setDark: () => {},
    // 当前主题色
    colorPrimary: null,
    // 设置主题色
    setColorPrimary: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [dark, setDark] = useState(false)
    const [colorPrimary, setColorPrimary] = useState<string | null>(null)

    // 初始化执行
    useEffect(() => {
        // 先从localStorage里获取主题配置
        const localTheme = window.localStorage.getItem(
            globalConfig.SESSION_LOGIN_THEME
        )

        // 序列化localStorage的值
        const localThemeObject = localTheme ? JSON.parse(localTheme) : {}

        // 初始化亮色/深色主题（优先使用localStorage，否则使用全局配置中的默认值）
        const initDart = localThemeObject.dark
            ? localThemeObject.dark
            : globalConfig.initTheme.dark

        // 初始化主题色（优先使用localStorage，否则使用全局配置中的默认值）
        const initColorPrimary = localThemeObject.colorPrimary
            ? localThemeObject.colorPrimary
            : globalConfig.initTheme.colorPrimary

        // 设置
        setDark(initDart)
        setColorPrimary(initColorPrimary)
    }, [])

    // 当dark或colorPrimary发生改变时执行
    useEffect(() => {
        // 主题色状态改变时，也同步写入localStorage
        window.localStorage.setItem(
            globalConfig.SESSION_LOGIN_THEME,
            JSON.stringify({ dark, colorPrimary })
        )
        // 在body上添加theme-mode属性，标记当前主题模式（便于实现亮暗模式下的CSS差异化）
        if (dark) {
            document.body.setAttribute('theme-mode', 'dark')
        } else {
            document.body.setAttribute('theme-mode', 'light')
        }
    }, [dark, colorPrimary])

    return (
        <ThemeContext.Provider
            value={{ dark, setDark, colorPrimary, setColorPrimary }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)