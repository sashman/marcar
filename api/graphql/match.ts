import { schema } from 'nexus'

schema.objectType({
  name: 'Match',
  definition(t) {
    t.model.id()
  },
})

schema.queryType({
  definition(t) {},
})
