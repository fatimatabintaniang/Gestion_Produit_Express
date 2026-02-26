import { defineConfig } from 'prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

export default defineConfig({
  // L'option "earlyAccess" est activée pour permettre l'utilisation de fonctionnalités expérimentales de Prisma. Cela peut inclure des fonctionnalités qui ne sont pas encore stables, mais qui offrent des avantages ou des améliorations par rapport aux versions précédentes.
  earlyAccess: true,
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL
  },
  migrate: {
    async adapter() {
      return new PrismaPg({ connectionString: process.env.DATABASE_URL })
    }
  }
})