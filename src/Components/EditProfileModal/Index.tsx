import styles from './EditProfileModal.module.css'
import Modal from "react-modal"
import { Avatar } from '../Avatar/Index'
import { useAuth0 } from '@auth0/auth0-react'
import { PencilLine } from 'phosphor-react'

Modal.setAppElement('#root')

interface EditProfileModalProps {
  isOpen: boolean
  onRequestClose: () => void
}


export function EditProfileModal({ isOpen, onRequestClose }: EditProfileModalProps) {
  const { user } = useAuth0()
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <img className={styles.hero} src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=40" />

      <form action="" className={styles.formContent}>
        <section className={styles.content}>
          <Avatar
            src={user?.picture || ``}
            alt='foto de perfil'
          />

          <label htmlFor="name">
            <input type="text" name='name' placeholder='Nome' required />
            {/* <abbr title="campo obrigatório">*</abbr> */}
          </label>

          <label htmlFor="role">
            <input type="text" name="role" placeholder='Cargo' />
          </label>
        </section>

        <footer>
          <button >
            <PencilLine size={20} />
            <span>Salvar perfil</span>
          </button>
        </footer>
      </form>


    </Modal>
  )
}

//TODO criar o layout do modal