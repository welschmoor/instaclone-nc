const client = require('../../client.js')


const showAllUsersResolvers = {
  Query: {
    showAllUsers: async (root, { limit }) => {
      const searchResult = await client.user.findMany({
        take: limit,
        select: {
          username: true,
          id: true,
          avatar: true,
        }
      })
      return searchResult
    }
  }
}

module.exports = showAllUsersResolvers 