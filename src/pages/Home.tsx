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
  // const [posts, setPosts] = useState<Posts[]>([])
  const posts = [
    {
      id: '1',
      author: {
        avatarUrl: 'https://github.com/diego3g.png',
        name: 'Diego Fernandes',
        role: 'CTO @Rocketseat'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.' },
        { type: 'link', content: 'jane.design/doctorcare' },
        { type: 'moreLinks', content: ['#frontend', '#react', 'nodejs'] }
      ],
      publishedAt: new Date('2022-06-09T20:30:02').toISOString(),
      comments: [
        {
          id: '1',
          author: {
            avatarUrl: 'https://github.com/maykbrito.png',
            name: 'Mayke Brito',
            role: 'Educator @Rocketseat'
          },
          content: 'Boa diegão, mandou bem!!',
          publishedAt: new Date('2022-06-10T20:01:12').toISOString()
        }
      ]
    },
    {
      id: '2',
      author: {
        avatarUrl: 'https://github.com/maykbrito.png',
        name: 'Mayke Brito',
        role: 'Educator @Rocketseat'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.' },
        { type: 'link', content: 'jane.design/doctorcare' },
        { type: 'moreLinks', content: ['#frontend', '#react'] }
      ],
      publishedAt: new Date('2022-06-09T19:43:12').toISOString(),
      comments: [
        {
          id: '1',
          author: {
            avatarUrl: 'https://github.com/jakeliny.png',
            name: 'Jakeliny Gracielly',
            role: 'Educator @Rocketseat'
          },
          content: 'Boa Maykão, mandou bem!!',
          publishedAt: new Date('2022-06-10T20:15:30').toISOString()
        }
      ]
    },
    {
      id: '3',
      author: {
        avatarUrl: 'https://github.com/jakeliny.png',
        name: 'Jakeliny Gracielly',
        role: 'Educator @Rocketseat'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.' },
        { type: 'link', content: 'jane.design/doctorcare' },
        { type: 'moreLinks', content: ['#frontend', '#react'] },
      ],
      publishedAt: new Date('2022-06-09T21:15:49').toISOString(),
      comments: [
        {
          id: '1',
          author: {
            avatarUrl: 'https://github.com/maykbrito.png',
            name: 'Mayke Brito',
            role: 'Educator @Rocketseat'
          },
          content: 'Boa Jake, mandou bem!!',
          publishedAt: new Date('2022-06-10T19:55:12').toISOString()
        },
        {
          id: '2',
          author: {
            avatarUrl: 'https://github.com/diego3g.png',
            name: 'Diego Fernandes',
            role: 'CTO @Rocketseat'
          },
          content: 'Boa Jake, mandou bem!!',
          publishedAt: new Date('2022-06-10T20:55:12').toISOString()
        }
      ]
    }
  ]
  const { user, isAuthenticated, error } = useAuth0()
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
          setRole={setRole}
          name={name}
          setName={setName}
        />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                publishedAt={post.publishedAt}
                comments={post.comments}
                content={post.content}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
