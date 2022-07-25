import { Header } from "../Components/Header/Index";
import { Sidebar } from "../Components/Sidebar/Index";

import '../global.css'
import styles from './Home.module.css'
import { Post, Posts } from "../Components/Post/Index";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { EditProfileModal } from "../Components/EditProfileModal/Index";

export function Home() {
  const [posts, setPosts] = useState<Posts[]>([])
  const { user, isAuthenticated, error } = useAuth0()
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [name, setName] = useState(user?.name)
  const [role, setRole] = useState('Cargo')

  function handleOpenEditProfileModal() {
    setIsEditProfileModalOpen(true)
  }

  function handleCloseEditProfileModal() {
    setIsEditProfileModalOpen(false)
  }

  useEffect(() => {
    api.get('posts')
      .then(response => setPosts(response.data.posts))
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated)
      return
    }
    console.log(error)
  }, [isAuthenticated])

  return (
    <>
      <Header />
      <div className={isAuthenticated ? styles.wrapper : styles.wrapper_}>
        <Sidebar
          onOpenEditProfileModal={handleOpenEditProfileModal}
          name={name}
          role={role}
        />
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onRequestClose={handleCloseEditProfileModal}
        />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
