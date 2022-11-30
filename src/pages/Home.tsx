import { Header } from "../components/Header/Index";
import { Sidebar } from "../components/Sidebar/Index";

import '../global.css'
import styles from './Home.module.css'
import { Post, Posts } from "../components/Post/Index";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { EditProfileModal } from "../components/EditProfileModal/Index";

export function Home() {
  const [posts, setPosts] = useState<Posts[]>([])
  const {user, isAuthenticated, error } = useAuth0()
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('Cargo')

  function handleOpenEditProfileModal() {
    setIsEditProfileModalOpen(true)
  }

  function handleCloseEditProfileModal() {
    setIsEditProfileModalOpen(false)
  }

  useEffect(() => {
    if (user?.nickname) {
      setName(user?.nickname)
    }
    return
  }, [user])

  useEffect(() => {
    api.get('/posts')
      .then( res => res.data)
      .then( data => setPosts(data.posts))
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return (
    <>
      <Header />
      <div className={isAuthenticated ? styles.wrapper : styles.wrapper_}>
        { isAuthenticated && (
          <Sidebar
            onOpenEditProfileModal={handleOpenEditProfileModal}
            name={name}
            role={role}
          />
        )}
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onRequestClose={handleCloseEditProfileModal}
          setRole={setRole}
          name={name}
          setName={setName}
        />
        <main>
          {posts.map((post, index) => {
            return (
              <Post
                key={index}
                author={post.author}
                publishedAt={post.publishedAt}
                comments={post.comments}
                content={post.content}
                name={name}
                role={role}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
