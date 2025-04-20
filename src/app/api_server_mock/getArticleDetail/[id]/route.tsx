import { NextRequest, NextResponse } from 'next/server'

const articleList = [
    {
        id: 1,
        title: '一个近乎完美的Konva手写板诞生记（React版）',
        pubDate: '2025-02-18',
        content:
            '最近，开发了一个用于移动批阅的Web手写板工具。大致业务需求如下...',
    },
    {
        id: 2,
        title: '2025新春版：轻松搞定Vite6+React19全家桶',
        pubDate: '2024-12-30',
        content:
            '最近真是赶上了大版本升级高峰期，2024年11月26日Vite6正式发布了，紧接着12月5日React19又发布了。',
    },
    {
        id: 3,
        title: '2024金秋版：Django5开发与部署保姆级零基础教程',
        pubDate: '22024-08-06',
        content:
            'Django是一款非常优秀并被广泛使用的Python Web开发框架，它推崇敏捷开发，并提供了大量内置功能，帮助开发者迅速构建安全、可维护、高性能的 Web 应用程序。相信很多同学非常关注Django。',
    },
    {
        id: 4,
        title: '2024新春版：零基础Docker全栈开发部署速通攻略',
        pubDate: '2024-01-02',
        content:
            '相信大家对Docker早就不陌生了，网上也有很多Docker教程。有很多同学已经使用Docker大幅提高了开发和部署效率，但也有很多同学还没接触过，或者正在摸索Docker的学习阶段。',
    },
    {
        id: 5,
        title: '2023金秋版：基于electron-vite构建React桌面客户端',
        pubDate: '2023-10-07',
        content:
            'Electron是一个基于Chromium和Node.js，可以使用HTML、CSS和JavaScript构建跨平台应用的技术框架，兼容Mac、Windows和 Linux。',
    },
    {
        id: 6,
        title: '2023金秋版：基于Vite4+React的Chrome插件开发教程',
        pubDate: '2023-08-14',
        content:
            'Chrome浏览器插件（Chrome Extension，简称CRX）大家已经非常熟悉了。目前的Chrome Extension开发应该按照Manifest V3的规范。',
    },
]

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // 获取id
    const { id } = await params
    // 将id转换为数字类型
    const _id = parseInt(id, 10)
    // id为非数字，文章不存在
    if (isNaN(_id)) {
        return NextResponse.json({
            code: 200,
            message: '文章不存在',
            data: null,
        })
    }

    // 从articleList找到对应id的数据
    const article = articleList.find((item) => item.id === _id)

    // 找到对应id的文章，返回数据
    if (article) {
        return NextResponse.json({
            code: 200,
            message: 'OK',
            data: article,
        })
    }

    // 未匹配到id，文章不存在
    return NextResponse.json({
        code: 200,
        message: '文章不存在',
        data: null,
    })
}