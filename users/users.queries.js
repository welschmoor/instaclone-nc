const client = require('../client.js')

const resolverQuery = {
  Query: {
    allUsers: async () => await client.user.findMany(),
  }
}

module.exports = resolverQuery