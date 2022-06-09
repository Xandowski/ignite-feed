import { Header } from "./Components/Header/Index";
import { Sidebar } from "./Components/Sidebar/Index";

import './global.css'
import styles from './App.module.css'
import { Post } from "./Components/Post/Index";

export function App() {
  return (
    <>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          <Post/>
          <Post/>
        </main>
      </div>
    </>
  )
}
