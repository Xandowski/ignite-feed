import { useAuth0 } from '@auth0/auth0-react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'
import { Avatar } from '../Avatar/Index'
import { Comment } from '../Comment/Index'
import styles from './Post.module.css'

export interface Comments {
  id: string
  author: {
    avatarUrl: string | undefined
    name: string
    role: string
  },
  content: string,
  publishedAt: string,
  likes: number
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
  const [postComments, setPostComments] = useState<Comments[]>(comments)
  const [likeComments, setLikeComments] = useState<number>(0)
  const publishedDateFormatted = format(Date.parse(publishedAt), "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(Date.parse(publishedAt), {
    locale: ptBR,
    addSuffix: true
  })
  const { user, isAuthenticated } = useAuth0()
  const [comment, setComment] = useState('')
  
  function handleNewCommentChange(event: FormEvent) {
    (event.target as HTMLTextAreaElement).setCustomValidity("")
    const comment = (event.target as HTMLTextAreaElement).value
    setComment(comment)
  }

  function handleNewCommentInvalid(event: FormEvent) {
    (event.target as HTMLTextAreaElement).setCustomValidity("Esse campo é obrigatório")
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    const commentUser = {
      id: (postComments.length + 1).toString(),
      author: {
        avatarUrl: user?.picture,
        name: name,
        role: role
      },
      content: comment,
      publishedAt: new Date().toISOString(),
      likes: 0
    }

    setPostComments([...postComments, commentUser])
    
    api.patch(`/posts/:${id}`, {
      comments: postComments
    })

    setComment('')
  }

  function deleteComment(commentId: string) {
    const comment = postComments.findIndex(element => element.id === commentId)
    if(!isAuthenticated){
      return
    } else if(user?.nickname === postComments[comment].author.name) {
      setPostComments([...postComments.filter((c) => { return c.id !== commentId && c })])

      api.delete(`/posts/:${id}/comments/:${commentId}`)
    }
  }

  function onLikeComment(commentLikes: number, commentId: string) {
    setPostComments([...postComments.map((c) => {
      if(c.id === commentId){
        c.likes = commentLikes + 1
      }
      return c
    })])
  }

  const isNewCommentEmpty = comment.length === 0

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
          value={comment}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          {isAuthenticated && <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>}
        </footer>
      </form>

      <div className={styles.commentList}>
        {postComments?.map((comment) => {
          return (
            <Comment 
              key={comment.publishedAt} 
              postId={id} 
              comment={comment}
              deleteComment={deleteComment}
              onLikeComment={onLikeComment}
            />
          )
        })}
      </div>
    </article>
  )
}