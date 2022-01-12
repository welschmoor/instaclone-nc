const client = require('../client.js')
const { GraphQLUpload } = require('graphql-upload')

const resolverQuery = {
  Query: {
    allUsers: async () => await client.user.findMany(),
  },

  Upload: GraphQLUpload,

}

module.exports = resolverQuery