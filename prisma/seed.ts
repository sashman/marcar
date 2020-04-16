import { PrismaClient } from '@prisma/client'
var faker = require('faker')
faker.locale = 'es'
//  faker = require('faker');

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

  console.log('Deleting teams')
  await db.team.deleteMany({})

  console.log('Creating users')
  const userData = new Array(10).fill(0).map((_, i) => ({
    // name: `User ${i}`,
    name: faker.name.findName(),
    email: `user${i}@test.com`,
  }))

  const users = await Promise.all(
    userData.map((data) => db.user.create({ data })),
  )

  console.log('Creating match')

  const match = await db.match.create({
    data: {
      scheduledAt: tomorrow(),
      teams: {
        create: [
          {
            name: 'Blue',
          },
          { name: 'Red' },
        ],
      },
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
          team: {
            connect: {
              matchId_name: {
                matchId: match.id,
                name: user.id % 2 === 0 ? 'Red' : 'Blue',
              },
            },
          },
        },
      }),
    ),
  )

  console.log('Seeded: %j', { users, match, participants })

  db.disconnect()
}
