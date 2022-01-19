

const client = require("../../client.js")


const meResolvers = {
  Query: {
    me: async (root, args, { currentUser }) => {
      if (currentUser === null || !currentUser) {
        return null
      }

      return currentUser

    }
  }
}

module.exports = meResolvers