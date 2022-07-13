import { useAuth0 } from '@auth0/auth0-react'
import { PencilLine } from 'phosphor-react'
import { Avatar } from '../Avatar/Index'
import styles from './Sidebar.module.css'

export function Sidebar() {
  const { user, isAuthenticated } = useAuth0()
  return (
    isAuthenticated && (
      <aside className={styles.sidebar}>
        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=40" />

        <section>
          <Avatar
            src='https://github.com/xandowski.png'
            alt='foto de perfil'
          />
          <strong>Alexandre Morais</strong>
          <span>Frontend Developer</span>
        </section>

        <footer>
          <a href="">
            <PencilLine size={20} />
            <span>Editar perfil</span>
          </a>
        </footer>
      </aside>
    )
  )

}