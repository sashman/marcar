import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  console.log('Deleting users')

  await db.user.deleteMany({})

  console.log('Deleting matches')
  await db.match.deleteMany({})

  console.log('Deleting participants')
  await db.participant.deleteMany({})

  console.log('Creating users')
  const userData = new Array(5).fill(0).map((_, i) => ({
    name: `User ${i}`,
    email: `user${i}@test.com`,
  }))

  const users = await Promise.all(
    userData.map((data) => db.user.create({ data })),
  )

  console.log('Creating match')
  const match = await db.match.create({
    data: {
      participants: {
        create: users.map((user) => ({
          participant: { connect: { id: user.id } },
        })),
      },
    },
  })
  // connect: results.map(result => ({ id: result.id }))

  console.log('Seeded: %j', { users, match })

  db.disconnect()
}
