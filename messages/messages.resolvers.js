


const messagesResolvers = {
  Room: {
    users: async ({ id }) => {
      return await client.room.findUnique({
        where: { id }
      }).users()
    },
    // a better way for above is to do like messages below where we find
    // many based on room id (search for client.user.findMany)

    // this below can be done with client.room.findUnique(...).messages()
    // but less efficient.  Also, in the future add pagination to this:
    messages: async ({ id }) => {
      return await client.message.findMany({
        where: { roomId: id }
      })
    },

    unreadTotal: async ({ id }, args, { currentUser }) => {
      if (!currentUser || currentUser === null) {
        return 0
      }
      // counting messages, that are not read, that are in that room, that are not created by me.
      return await client.message.count({
        where: { read: false, roomId: id, user: { id: { not: currentUser.id } } }
      })
    },
  },
  Message: {
    user: async ({ id }, args, { currentUser }) => {

      if (!currentUser || currentUser === null) {
        return 0
      }

      return await client.message.findUnique({
        where: { id }
      }).user()

    }
  }
}


module.exports = messagesResolvers