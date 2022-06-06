import styles from './Header.module.css'
import Logo from '../../assets/Logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="logo do ignite"/>
      <span>Ignite Feed</span>
    </header>
  )
}