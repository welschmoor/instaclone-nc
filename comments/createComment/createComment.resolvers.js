const client = require('../../client.js')


const createCommentResolvers = {
  Mutation: {
    createComment: async (root, { photoId, payload }, { currentUser }) => {

      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      // select id: true means we don't retreive unnecessary data
      const photoInQ = await client.photo.findUnique({ where: { id: photoId }, select: { id: true } })
      console.log(photoInQ)
      if (!photoInQ) {
        return { ok: false, error: "photo not found" }
      }

      try {
        const createdComment = await client.comment.create({
          data: {
            payload: payload,
            photo: {
              connect: {
                id: photoInQ.id
              }
            },
            user: {
              connect: {
                id: currentUser.id
              }
            }
          }
        })
        console.log("createdComment", createdComment)
        return { ok: true, commentId: createdComment.id }
      } catch (error) {
        console.log("error:::", error)
        return { ok: false, error: error }
      }
    }
  }
}

module.exports = createCommentResolvers 