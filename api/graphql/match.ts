import { schema } from 'nexus'

schema.objectType({
  name: 'Match',
  definition(t) {
    t.model.id()
    t.model.participants()
    t.model.teams()
    t.model.owner()
    t.model.scheduledAt()
  },
})
