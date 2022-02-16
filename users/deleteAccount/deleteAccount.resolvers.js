// please, don't look at this code, - Johannes
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

      const allUserPicsIDs = await client.photo.findMany({
        where: {
          userId: id
        },
        select: { id: true }
      })
      const picIDarray = allUserPicsIDs.map(e => e.id)
      console.log("picIDarray", picIDarray, "AAl")

      if (currentUser.id === userInQ.id) {
        // delete everything that belongs to user first
        const likeDeleteResult = await client.like.deleteMany({
          where: { userId: id }
        })

        // this probably works with photoId: {in: ...} too!
        for (const each of allUserPicsIDs) {
          await client.like.deleteMany({
            where: { photoId: each.id }
          })
        }

        // This is how to delete MANY comments!!! fcking remember it
        // we pass the array of IDs to delete
        await client.comment.deleteMany({
          where: { photoId: { in: picIDarray } }
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