import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

function tomorrow() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

async function main() {
  console.log('Deleting participants')
  await db.participant.deleteMany({})

  console.log('Deleting matches')
  await db.match.deleteMany({})

  console.log('Deleting owners')
  await db.owner.deleteMany({})

  console.log('Deleting users')
  await db.user.deleteMany({})

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
      scheduledAt: tomorrow(),
      owner: {
        create: {
          user: {
            connect: {
              id: users[0].id,
            },
          },
        },
      },
    },
  })

  console.log('Creating participants')

  const participants = await Promise.all(
    users.map((user) =>
      db.participant.create({
        data: {
          match: {
            connect: {
              id: match.id,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      }),
    ),
  )

  console.log('Seeded: %j', { users, match, participants })

  db.disconnect()
}
