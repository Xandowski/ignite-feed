import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import Server from './server'

Server()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
