import { schema } from 'nexus'

schema.objectType({
  name: 'Owner',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.match()
  },
})
