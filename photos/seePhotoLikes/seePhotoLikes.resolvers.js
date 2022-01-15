const client = require('../../client.js')


const seePhotoLikesResolvers = {
  Query: {
    seePhotoLikes: async (root, { id }) => {
      console.log(">?>?")
      const likeInQ = await client.like.findMany({
        where: { photoId: id },
        select: { user: { select: { username: true } } }, // we only select what we want to see from user
      })
      console.log(likeInQ)
      return likeInQ.map(e => e.user)


    },
  }
}

module.exports = seePhotoLikesResolvers

