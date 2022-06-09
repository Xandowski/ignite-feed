import { Avatar } from '../Avatar/Index'
import { Comment } from '../Comment/Index'
import styles from './Post.module.css'

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src='https://github.com/xandowski.png'
            alt='foto de perfil'
          />
          <div className={styles.authorInfo}>
            <strong>Username</strong>
            <span>Position</span>
          </div>
        </div>

        <time title="05 de Junho às 23:44h" dateTime="2022-06-05">Publicado há 1h</time>
      </header>

      <section className={styles.content}>
        <p>Fala galeraa</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat aspernatur dolorum corporis, consequuntur delectus accusamus id dolor laborum pariatur saepe cupiditate reprehenderit voluptas ex.</p>

        <p><a href="">link para algo</a></p>
        <p>
          <a href="">#frontend</a>
          <a href="">#react</a>
        </p>
      </section>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>       
      </form>
      
      <div className={styles.commentList}>
        <Comment/>
      </div>
    </article>
  )
}