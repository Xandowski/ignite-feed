import styles from './Comment.module.css'
import { FaThumbsUp, FaTrash } from "react-icons/fa"
import { Avatar } from '../Avatar/Index'
import { ptBR } from 'date-fns/locale'
import { format, formatDistanceToNow } from 'date-fns'
import { Comments } from '../Post/Index'

interface CommentProps {
  postId?: string,
  deleteComment: (id: string) => void,
  onLikeComment: (likeCount: number, commentId: string) => void,
  comment: Comments
}

export function Comment({comment, deleteComment, onLikeComment}:CommentProps) {
  const publishedDateFormatted = format(Date.parse(comment.publishedAt), "d 'de' LLLL 'às' HH:mm'h'",
  {locale: ptBR})

  const publishedDateRelativeToNow = formatDistanceToNow(Date.parse(comment.publishedAt), {
    locale: ptBR,
    addSuffix: true
  })

  const handleDeleteComment = () => {
    deleteComment(comment.id)
  }

  const handleLikeComment = () => {
    onLikeComment(comment.likes, comment.id)
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src={comment.author.avatarUrl} 
        alt="foto de perfil"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{
                comment.author.name}
                <span> - {comment.author.role}</span>
              </strong>
              <time title={publishedDateFormatted} dateTime={comment.publishedAt}>
                {publishedDateRelativeToNow}
              </time>
            </div>

            <button title="Deletar comentário" className={styles.delete} onClick={handleDeleteComment}>
              <FaTrash size={20} />
            </button>
          </header>

          <p>{comment.content}</p>
        </div>

        <footer>
          <button className={styles.like} onClick={handleLikeComment}>
            <FaThumbsUp size={20}/>
            Aplaudir <span>{comment.likes}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}