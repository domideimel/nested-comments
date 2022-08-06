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

app.register(fastifyCors)
app.register(fastifySensible)

app.get('/posts', async (req, res) => {
  return await commitToDB(prisma.post.findMany({
    select: {
      id: true,
      title: true
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
