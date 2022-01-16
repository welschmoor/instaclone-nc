const client = require('../../client.js')


const sendMessageResolvers = {
  Mutation: {
    sendMessage: async (root, { payload, userId, roomId }, { currentUser }) => {
      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401, not logged in" }
      }

      let room = null;
      if (userId) {
        const user = await client.user.findUnique({
          where: { id: userId }, select: { id: true }
        })
        if (!user) {
          return { ok: false, error: "user not found" }
        }

        room = await client.room.create({
          data: {
            users: {
              connect: [
                {
                  id: userId
                },
                {
                  id: currentUser.id
                }
              ]
            }
          }
        })
        
      }//endIF userId
      else if (roomId) {
        room = await client.room.findUnique({
          where: { id: roomId }, select: { id: true }
        })
        if (!room) {
          return { ok: false, error: "chat room not found" }
        }
      }

      const newMessage = await client.message.create({
        data: {
          payload: payload,
          room: {
            connect: { id: room.id }
          },
          user: {
            connect: {
              id: currentUser.id
            }
          }
        }
      })
      return { ok: true }
    },
  }
}

module.exports = sendMessageResolvers





