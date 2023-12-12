import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const generateDatabaseURL = (schema: string) => {
  if(!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment> {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('PASSEI AQUI')
    const schema = randomUUID()
    const database = generateDatabaseURL(schema)

    process.env.DATABASE_URL = database

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )

        await prisma.$disconnect()
      }
    }
  },
}