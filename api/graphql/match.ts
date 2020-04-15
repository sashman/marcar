import { schema } from 'nexus'

schema.objectType({
  name: 'Match',
  definition(t) {
    t.model.id()
    t.model.participants()
    t.model.owner()
    t.model.scheduledAt()
  },
})
