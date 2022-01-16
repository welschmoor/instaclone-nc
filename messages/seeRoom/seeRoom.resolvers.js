const client = require('../../client.js')


const seeRoomResolvers = {
  Query: {
    seeRoom: async (root, { id }, { currentUser }) => {
      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401, not logged in" }
      }

      // the reason we use findFirst is it allows us to search for
      // non-unique things
      const room = client.room.findFirst({
        where: { id: id, users: { some: { id: currentUser.id } } }
      })

      return room
    }
  }
}

module.exports = seeRoomResolvers 