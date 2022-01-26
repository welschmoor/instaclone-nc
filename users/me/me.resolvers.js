

const client = require("../../client.js")


const meResolvers = {
  Query: {
    me: async (root, args, { currentUser }) => {
      if (currentUser === null || !currentUser) {
        return null
      }
      const uniqueUser = await client.user.findUnique({
        where: { id: currentUser.id }
      })
      return uniqueUser

    }
  }
}

module.exports = meResolvers