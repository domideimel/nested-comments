import fastify from 'fastify'
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import fastifyCors from '@fastify/cors'
import fastifySensible from '@fastify/sensible'

// Dotenv Config
config()

const app = fastify()
const prisma = new PrismaClient()

app.register(fastifyCors)
app.register(fastifySensible)

app.get('/posts', async (req, res) => {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true
    }
  })
})

app.listen({
  port: Number(process.env.PORT) || 3000,
})
