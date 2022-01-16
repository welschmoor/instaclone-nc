const client = require('../../client.js')


const seeRoomsResolvers = {
  Query: {
    seeRooms: async (root, args, { currentUser }) => {

      if (!currentUser || currentUser === null) {
        return []
      }

      return client.room.findMany({
        where: {
          users: { some: { id: currentUser.id } }
        }
      })
    },
  }
}

module.exports = seeRoomsResolvers 