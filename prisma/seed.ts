import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  await db.user.deleteMany({})

  const results = await Promise.all(
    [
      {
        name: 'User 1',
        email: 'user1@test.com',
      },
      {
        name: 'User 2',
        email: 'user2@test.com',
      },
    ].map((data) => db.user.create({ data })),
  )

  console.log('Seeded: %j', results)

  db.disconnect()
}
