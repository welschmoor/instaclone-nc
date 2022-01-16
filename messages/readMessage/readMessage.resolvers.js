const client = require('../../client.js')


const readMessageResolvers = {
  Mutation: {
    readMessage: async (root, { id }, { currentUser }) => {
      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: unauthorized" }
      }

      const message = await client.message.findFirst({
        where: {
          id: id,
          userId: { not: currentUser.id },
          room: { users: { some: { id: currentUser.id } } }
        },
        select: { id: true }
      })

      if (!message) {
        return { ok: false, error: "message not found" }
      }

      await client.message.update({
        where: { id: message.id },
        data: { read: true }
      })

      return { ok: true }
    },
  }
}

module.exports = readMessageResolvers 