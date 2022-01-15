const client = require('../../client.js')


const likePhotoResolvers = {
  Mutation: {
    toggleLike: async (root, { id }, { currentUser }) => {

      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      const photoInQ = await client.photo.findUnique({
        where: { id: id }
      })

      if (!photoInQ) {
        return { ok: false, error: "photo not found" }
      }

      const like = await client.like.findUnique({
        where: {
          photoId_userId: {
            userId: currentUser.id,
            photoId: id,
          }
        }
      })

      // if we find like, we unlike
      if (like) {
        await client.like.delete({
          where: {
            photoId_userId: {
              userId: currentUser.id,
              photoId: id,
            }
          }
        })
      } else { //else we like
        await client.like.create({
          data: {
            user: {
              connect: { 
                id: currentUser.id,
              }
            },
            photo: {
              connect: {
                id: photoInQ.id,
              }
            }
          }
        })
      }

      return { ok: true }
    }
  }
}

module.exports = likePhotoResolvers 