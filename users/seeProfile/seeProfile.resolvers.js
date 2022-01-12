

const seeProfileResolvers = {
  Query: {
    seeProfile: async (root, { username }) => {
      return client.user.findUnique({ where: { username } })
    },
  }
}
module.exports = seeProfileResolvers





