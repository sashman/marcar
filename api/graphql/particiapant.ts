import { schema } from 'nexus'

schema.objectType({
  name: 'Participant',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.match()
  },
})
