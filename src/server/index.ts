import { createServer, Model } from "miragejs"

export default function () {
  createServer({
    models: {
      post: Model,
    },

    seeds(server) {
      server.create("post", { 
        id: '1',
        author: {
          avatarUrl: 'https://github.com/diego3g.png',
          name: 'Diego Fernandes',
          role: 'CTO @Rocketseat'
        },
        content: [
          { type: 'paragraph', content: 'Fala galeraa 👋'},
          { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.'},
          { type: 'link', content: 'jane.design/doctorcare'},
        ]
      })
      server.create("post", { 
        id: '2',
        author: {
          avatarUrl: 'https://github.com/maykbrito.png',
          name: 'Mayke Brito',
          role: 'Educator @Rocketseat'
        },
        content: [
          { type: 'paragraph', content: 'Fala galeraa 👋'},
          { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.'},
          { type: 'link', content: 'jane.design/doctorcare'},
        ]
      })
      server.create("post", { 
        id: '3',
        author: {
          avatarUrl: 'https://github.com/diego3g.png',
          name: 'Diego Fernandes',
          role: 'Educator @Rocketseat'
        },
        content: [
          { type: 'paragraph', content: 'Fala galeraa 👋'},
          { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.'},
          { type: 'link', content: 'jane.design/doctorcare'},
        ]
      })
    },
    
    routes() {
      this.namespace = 'api'

      this.get("/posts", (schema) => {
        return schema.posts.all()
      })

    },
  })
}