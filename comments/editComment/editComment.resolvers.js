const client = require('../../client.js')


const editCommentResolvers = {
  Mutation: {
    editComment: async (root, { id, payload }, { currentUser }) => {
      if (!payload) {
        return { ok: false, error: "comment can't be empty" }
      }
      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      const commentInQ = await client.comment.findUnique({
        where: { id },
        select: { userId: true, id: true }
      })

      if (!commentInQ) {
        return { ok: false, error: "404 comment does not exist" }
      }

      if (commentInQ.userId === currentUser.id) {
        await client.comment.update({
          where: { id: commentInQ.id },
          data: { payload: payload },
        })
        return { ok: true }
      }

      return { ok: false, error: "can't edit someone else's comments" }
    }
  }
}

module.exports = editCommentResolvers 