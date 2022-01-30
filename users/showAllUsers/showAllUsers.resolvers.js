const client = require('../../client.js')


const showAllUsersResolvers = {
  Query: {
    showAllUsers: async () => {
      const searchResult = await client.user.findMany({
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