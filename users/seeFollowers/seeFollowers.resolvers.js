const client = require('../../client.js')


const seeFollowersResolvers = {
  Query: {
    seeFollowers: async (root, args) => {
      const take = 5
      try {
        const followers = await client.user
          .findUnique({ where: { username: args.username } })
          .followers({ take: take, skip: (args.page - 1) * 5 })

        const countFolowers = await client.user.count({
          where: { following: { some: { username: args.username } } },
        })

        return { ok: true, followers: followers, totalPages: Math.ceil(countFolowers / take) }
      }
      catch (error) {
        return { ok: false, error: error }
      }
    }
  }
}
module.exports = seeFollowersResolvers


