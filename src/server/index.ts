import { Posts } from './../components/Post/Index'
import { createServer, Model, Registry } from "miragejs"
import { ModelDefinition } from "miragejs/-types"
import Schema from "miragejs/orm/schema"

const PostModel: ModelDefinition<Posts> = Model.extend({})

type AppRegistry = Registry<{ post: typeof PostModel }, {} >

type AppSchema = Schema<AppRegistry>;


export default function () {
  
  createServer({
    models: {
      post: PostModel,
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
          { type: 'paragraph', content: 'Fala galeraa 👋' },
          { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.' },
          { type: 'link', content: 'jane.design/doctorcare' },
          { type: 'moreLinks', content: ['#frontend', '#react', 'nodejs'] }
        ],
        publishedAt: new Date('2022-06-09T20:30:02').toISOString(),
        comments: [
           { id: '1',
            author: {
              avatarUrl: 'https://github.com/maykbrito.png',
              name: 'Mayke Brito',
              role: 'Educator @Rocketseat'
            },
            content: 'Boa diegão, mandou bem!!',
            publishedAt: new Date('2022-06-10T20:01:12').toISOString()}
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
      })


      server.create("post", {
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
      })
    },

    routes() {
      this.namespace = 'api'

      this.get("/posts", (schema) => {
        return schema.posts.all()
      })

      this.get("/posts/:id/comments", (schema: AppSchema, request) => {
        const postId = request.params?.id

        return schema.find('post', postId)
      })

      this.patch("/posts/:id", (schema: AppSchema, request) => {
        const postId = request.params.id
        const attrs = this.normalizedRequestAttrs()

        return schema.post.find(postId).update(attrs)
      })
      
      this.passthrough("https://ignite-apps.us.auth0.com/login/callback")
      this.passthrough("https://ignite-apps.us.auth0.com/u/login/**")
      this.passthrough("https://ignite-apps.us.auth0.com/u/login")
      this.passthrough("https://ignite-apps.us.auth0.com/**")
      this.passthrough()
    },
  })
}