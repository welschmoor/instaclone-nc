
const userResolvers = {
  User: {
    totalPics: async ({ id }) => {
      const picNum = await client.photo.count({
        where: {
          userId: id
        }
      })
      return picNum
    },

    totalFollowing: ({ id }, args) => {
      return client.user.count({ where: { followers: { some: { id } } } })
    },

    totalFollowers: ({ id }, args) => {
      // the followers are people who have the profiles username on their following list
      return client.user.count({ where: { following: { some: { id } } } })
    },

    isMe: ({ id }, _, context) => {
      if (context.currentUser === null) {
        return false
      }
      else if (id === context.currentUser.id) {
        return true
      }
      return false
    },

    isFollowing: async ({ id }, _, context) => {
      if (context.currentUser === null || !context.currentUser) {
        return false
      }
      const followingOneOrZero = await client.user.count({
        where: {
          id: context.currentUser.id,
          following: { some: { id } }
        },
      })
      return Boolean(followingOneOrZero)
    },
    photos: async ({ id }, { page }) => {
      // find user and get his photos
      return await client.user.findUnique({ where: { id } }).photos()
    }
  }
}

module.exports = userResolvers





///////////////////////
// Old Code
// less efficient way of following
    // isFollowing: async ({ id }, _, context) => {
    //   if (context.currentUser === null || !context.currentUser) {
    //     return false
    //   }
    //   const userInQ = await client.user
    //     .findUnique({ where: { id: context.currentUser.id } })
    //     .following({ where: { id: id } })
    //   if (userInQ.length === 0) {
    //     return false
    //   }
    //   return true // we can aslo write   return userInQ.length !== 0
    // },