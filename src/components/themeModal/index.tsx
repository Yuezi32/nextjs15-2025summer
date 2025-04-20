'use client'

import { Modal } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { globalConfig } from '@/globalConfig'
import { useTheme } from '@/components/themeContext'
import './themeModal.scss'
function ThemeModal({ onClose }: { onClose: () => void }) {
    // 引入主题上下文的hook
    const { colorPrimary, setColorPrimary } = useTheme()

    return (
        <Modal
            className="M-themeModal"
            open={true}
            title="主题色"
            onCancel={() => {
                onClose()
            }}
            maskClosable={false}
            footer={null}
        >
            <div className="colors-con">
                {globalConfig.customColorPrimarys &&
                    globalConfig.customColorPrimarys.map((item, index) => {
                        return (
                            <div
                                className="theme-color"
                                style={{ backgroundColor: item }}
                                key={index}
                                onClick={() => {
                                    setColorPrimary(item)
                                }}
                            >
                                {colorPrimary === item && (
                                    <CheckCircleFilled
                                        style={{
                                            fontSize: 28,
                                            color: '#fff',
                                        }}
                                    />
                                )}
                            </div>
                        )
                    })}
            </div>
        </Modal>
    )
}

export default ThemeModal