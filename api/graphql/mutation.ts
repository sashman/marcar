import { schema } from 'nexus'

schema.mutationType({
  definition(t) {
    t.crud.createOneMatch()
    t.crud.updateOneMatch()

    t.crud.createOneUser()
    t.crud.updateOneUser()

    t.crud.createOneParticipant()
    t.crud.updateOneParticipant()

    t.crud.createOneOwner()
    t.crud.updateOneOwner()
  },
})
