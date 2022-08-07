import fastify from 'fastify'
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import fastifyCors from '@fastify/cors'
import fastifySensible from '@fastify/sensible'
import { HttpError } from '@fastify/sensible/lib/httpError'

// Dotenv Config
config()

const app = fastify()
const prisma = new PrismaClient()

app.register(fastifyCors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
})
app.register(fastifySensible)

app.get('/posts', async (req, res) => {
  return await commitToDB(prisma.post.findMany({
    select: {
      id: true,
      title: true
    }
  }))
})

app.get<{ Params: { id: string } }>('/posts/:id', async (req, res) => {
  return await commitToDB(prisma.post.findUnique({
    where: {
      id: req.params.id
    },
    select: {
      id: true,
      body: true,
      title: true,
      comments: {
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          message: true,
          parentId: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  }))
})

async function commitToDB<T> (promise: Promise<T>): Promise<T | HttpError> {
  const [error, data] = await app.to(promise)
  if (error) return app.httpErrors.internalServerError(error.message)
  return data
}

app.listen({
  port: Number(process.env.PORT) || 3000,
})
