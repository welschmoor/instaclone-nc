

const seeProfileResolvers = {
  Query: {
    seeProfile: async (root, { username }) => {
      return client.user.findUnique({ where: { username }, include: { following: true, followers: true } })
    },
  }
}
module.exports = seeProfileResolvers





