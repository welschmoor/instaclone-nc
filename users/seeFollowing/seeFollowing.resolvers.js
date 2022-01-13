const client = require('../../client.js')


const seeFollowingResolvers = {
  Query: {
    seeFollowing: async (root, { username, cursor }) => {
      const take = 5
      try {
        const following = await client.user
          .findUnique({ where: { username } })
          .following({
            take: take, skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
          })
        console.log("following", following)
        return { ok: true, following }
      }
      catch (error) {
        return { ok: false, error }
      }
    }
  }
}

module.exports = seeFollowingResolvers 