import { NextResponse } from 'next/server'

const articleList = [
    { id: 1, title: '一个近乎完美的Konva手写板诞生记（React版）' },
    { id: 2, title: '2025新春版：轻松搞定Vite6+React19全家桶' },
    { id: 3, title: '2024金秋版：Django5开发与部署保姆级零基础教程' },
    { id: 4, title: '2024新春版：零基础Docker全栈开发部署速通攻略' },
    { id: 5, title: '2023金秋版：基于electron-vite构建React桌面客户端' },
    { id: 6, title: '2023金秋版：基于Vite4+React3的Chrome插件开发教程' },
]

export async function GET() {
   
    const responseData = {
        code: 200,
        message: 'OK',
        data: {
            // 当前页码数据
            list: articleList,
        },
    }

    return NextResponse.json(responseData)
}