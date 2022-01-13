const client = require('../../client.js')


const searchUsersResolvers = {
  Query: {
    searchUsers: async (root, { keyword }) => {
      const searchResult = await client.user.findMany({
        where: { username: { startsWith: keyword.trim().toLowerCase() } }
      })
      return searchResult
    }
  }
}

module.exports = searchUsersResolvers 