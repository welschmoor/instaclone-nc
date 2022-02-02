const client = require('../../client.js')


const seeProfileResolvers = {
  Query: {
    seeProfile: async (root, { username }) => {

      // this unique user has an array of photos, how
      // do I paginate them? 
      return client.user.findUnique({
        where: { username },
        include: { following: true, followers: true }
      })
    },
  }
}
module.exports = seeProfileResolvers





