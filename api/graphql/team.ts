import { schema } from 'nexus'

schema.objectType({
  name: 'Team',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.participants()
    t.model.match()
  },
})
