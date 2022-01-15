const client = require('../../client.js')


const seePhotoCommentsResolvers = {
  Query: {
    seePhotoComments: async (root, args) => {
      return await client.comment.findMany({
        where: { photoId: args.id },
        orderBy: {
          createdAt: "desc"
        },
      })
    },
  }
}

module.exports = seePhotoCommentsResolvers 