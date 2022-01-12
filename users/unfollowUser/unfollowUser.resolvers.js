const client = require('../../client.js')


const unfollowUserResolvers = {
  Mutation: {
    unfollowUser: async (root, args, context) => {
      if (context.currentUser === null) {
        return { ok: false, error: "401: unauthorized" }
      }

      try {
        await client.user.update({
          where: { id: context.currentUser.id },
          data: { following: { disconnect: { username: args.username } } }
        })
        return { ok: true }
      }
      catch (error) {
        return { ok: false, error: error }
      }
    },
  }
}

module.exports = unfollowUserResolvers 