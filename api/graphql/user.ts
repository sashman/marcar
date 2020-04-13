import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
  },
})

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

        if (!user) throw new Error(`No such user named "${args.user}"`)

        return user
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany()
      },
    })
  },
})
