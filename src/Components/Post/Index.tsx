import { useAuth0 } from '@auth0/auth0-react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Avatar } from '../Avatar/Index'
import { Comment } from '../Comment/Index'
import styles from './Post.module.css'

export interface Comments {
  author: {
    avatarUrl: string
    name: string
    role: string
  },
  content: string,
  publishedAt: string,
}

export interface Posts {
  id?: string
  author: {
    avatarUrl: string | undefined
    name: string
    role: string
  }
  publishedAt: string
  comments: Comments[]
  content: [
    { type: string, content: string | [string] }
  ]
  name: string
  role: string
}

export function Post({ id, author, publishedAt, comments, content, name, role }: Posts) {
  const [postComments, setPostComments] = useState(comments)
  const publishedDateFormatted = format(Date.parse(publishedAt), "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(Date.parse(publishedAt), {
    locale: ptBR,
    addSuffix: true
  })
  const { user, isAuthenticated } = useAuth0()
  const [newComment, setNewComment] = useState<Comments>()

  function handleNewCommentChange(event: FormEvent) {
    const comment = {
      author: {
        avatarUrl: user?.picture,
        name: name,
        role: role
      },
      content: (event.target as HTMLInputElement).value,
      publishedAt: new Date()
    }
    setNewComment(comment)
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    const comment = postComments
    comment.push(newComment)
    setPostComments(comment)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
            alt='foto de perfil'
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <section className={styles.content}>
        {content.map((row) => {
          if (row.type === 'paragraph') {
            return <p>{row.content}</p>
          } else if (row.type === 'link') {
            return <a>{row.content}</a>
          } else {
            return <p>
              {Array.isArray(row.content) && row.content.map((link) => {
                return <a href="">{link}</a>
              })}
            </p>
          }
        })}
      </section>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          value={newComment}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
        />

        <footer>
          {isAuthenticated && <button type="submit">Publicar</button>}
        </footer>
      </form>

      <div className={styles.commentList}>
        {postComments?.map((comment) => {
          return (
            <Comment comment={comment} />
          )
        })}
      </div>
    </article>
  )
}