const client = require('../../client.js')


const deletePhotoResolvers = {
  Mutation: {
    deletePhoto: async (root, { id }, { currentUser }) => {

      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      const photoInQ = await client.photo.findUnique({
        where: { id },
        select: { userId: true }
      })

      if (!photoInQ) {
        return { ok: false, error: "photo not found" }
      }
      console.log(photoInQ.userId, currentUser.id)


      if (photoInQ.userId === currentUser.id) {
        await client.photo.delete({
          where: { id: id }
        })
        return { ok: true }
      }

      return { ok: false, error: "401: You can't delete someone else's photos!" }
    }
  }
}

module.exports = deletePhotoResolvers 