const client = require('../../client.js')


const deleteCommentResolvers = {
  Mutation: {
    deleteComment: async (root, { id }, { currentUser }) => {

      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      const commentInQ = await client.comment.findUnique({
        where: { id },
        select: { userId: true }
      })

      if (!commentInQ) {
        return { ok: false, error: "comment not found" }
      }
      console.log(commentInQ.userId, currentUser.id)


      if (commentInQ.userId === currentUser.id) {
        await client.comment.delete({
          where: { id: id }
        })
        return { ok: true, id: id }
      }

      return { ok: false, error: "401: You can't delete someone else's comments!" }
    }
  }
}

module.exports = deleteCommentResolvers 