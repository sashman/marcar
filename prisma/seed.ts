import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  await db.user.deleteMany({})
  await db.match.deleteMany({})

  const users = new Array(5).fill(0).map((_, i) => ( {
    name: `User ${i}`,
    email: `user${i}@test.com`,
  }))

  const results = await Promise.all(
    users.map((data) => db.user.create({ data })),
    )

  const matchUpdated = await db.match.create({
    data: {
      players: {
        connect: results.map(result => ({ id: result.id }))
      }
    }
  })

  console.log('Seeded: %j', { results, matchUpdated })

  db.disconnect()
}
