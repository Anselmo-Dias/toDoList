import styles from './Header.module.css'

import LogoImg from '../assets/logo.svg'

export function Header() {
    return (
        <header className={styles.content}>
            <img src={LogoImg} alt="logo do site" />
        </header>
    )
}