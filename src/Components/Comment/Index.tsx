import styles from './Comment.module.css'

import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from '../Avatar/Index';

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/xandowski.png" 
        alt="foto de perfil"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Alexandre Morais (você)</strong>
              <time title="06 de Junho às 00:46h" dateTime="2022-06-06">Cerca de 2h atrás</time>
            </div>

            <button title="Deletar comentário" className={styles.delete}>
              <Trash size={24}/>
            </button>
          </header>

          <p>Muito bom, parabéns!!</p>
        </div>

        <footer>
          <button className={styles.like}>
            <ThumbsUp size={20}/>
            Aplaudir <span>33</span>
          </button>

          
        </footer>
      </div>
    </div>
  )
}