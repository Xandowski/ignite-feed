import styles from './Comment.module.css'

import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { Avatar } from '../Avatar/Index';
import { ptBR } from 'date-fns/locale';
import { format, formatDistanceToNow } from 'date-fns';

interface CommentProps {
  comment: {
    id?: string
    author: {
      avatarUrl: string
      name: string
      role: string
    },
    content: string,
    publishedAt: string,
  }
}

export function Comment({comment}:CommentProps) {
  const publishedDateFormatted = format(Date.parse(comment.publishedAt), "d 'de' LLLL 'às' HH:mm'h'",
  {locale: ptBR})

  const publishedDateRelativeToNow = formatDistanceToNow(Date.parse(comment.publishedAt), {
    locale: ptBR,
    addSuffix: true
  })

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

            <button title="Deletar comentário" className={styles.delete}>
              <FaTrash size={20}/>
            </button>
          </header>

          <p>{comment.content}</p>
        </div>

        <footer>
          <button className={styles.like}>
            <FaThumbsUp size={20}/>
            Aplaudir <span>33</span>
          </button>

          
        </footer>
      </div>
    </div>
  )
}