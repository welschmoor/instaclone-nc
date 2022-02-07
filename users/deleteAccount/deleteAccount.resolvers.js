const client = require('../../client.js')


const deleteAccountResolvers = {
  Mutation: {
    deleteAccount: async (root, { id }, { currentUser }) => {
      if (currentUser === null || !currentUser) {
        return { ok: false, error: "401: Unauthorized" }
      }

      const userInQ = await client.user.findUnique({
        where: { id: id },
      })

      if (currentUser.id === userInQ.id) {
        // delete everything that belongs to user first
        await client.like.deleteMany({
          where: { userId: id }
        })
        await client.comment.deleteMany({
          where: { userId: id }
        })
        await client.photo.deleteMany({
          where: { userId: id }
        })

        // delete user
        await client.user.delete({
          where: { id: id }
        })
        return { ok: true }
      }

      return { ok: false, error: "401: Unauthorized" }
    }
  }
}

module.exports = deleteAccountResolvers 