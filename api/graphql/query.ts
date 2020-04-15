import { schema } from 'nexus'

schema.queryType({
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {
        email: schema.stringArg({ required: false }),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findOne({
          where: {
            email: args.email,
          },
        })

        if (!user) throw new Error(`No such user email "${args.email}"`)

        return user
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany()
      },
    })

    t.list.field('matches', {
      type: 'Match',
      resolve(_root, _args, ctx) {
        return ctx.db.match.findMany()
      },
    })
  },
})
