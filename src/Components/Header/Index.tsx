import styles from './Header.module.css'
import Logo from '../../assets/Logo.svg'
import { useAuth0 } from '@auth0/auth0-react'

export function Header() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  return (
    <header className={styles.header}>
      <div>
        <img src={Logo} alt="logo do ignite" />
        <span>Ignite Feed</span>
      </div>

      {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>Sair</button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Entrar</button>
      )}

    </header>
  )
}