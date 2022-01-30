
const client = require("../../client.js")

const followUserResolvers = {
  Mutation: {
    followUser: async (root, args, context) => {
      if (context.currentUser === null) {
        return { ok: false, error: '401: unauthorized' }
      }
      const findUser = await client.user.findUnique({
        where: { username: args.username },
        select: { id: true }
      })
    
      try {
        await client.user.update({
          where: { id: context.currentUser.id },
          data: { following: { connect: { username: args.username } } }
        })
        return { ok: true, userFollowId: findUser.id }
      }
      catch (error) {
        return { ok: false, error: error }
      }
    },
  }
}
module.exports = followUserResolvers