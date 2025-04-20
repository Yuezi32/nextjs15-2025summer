import { Result } from 'antd'
import styles from './not-found.module.scss'

export default function NotFound() {
    return (
        <div className={styles['P-not-found']}>
            <Result status="404" title="404" subTitle="页面不存在哟~" />
        </div>
    )
}