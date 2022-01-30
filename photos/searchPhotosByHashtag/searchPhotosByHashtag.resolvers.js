const client = require('../../client.js')


const searchPhotosByHashtagResolvers = {
  Query: {
    // searchPhotosByHashtag: async (root, { hashtag }) => {
    //   return await client.photo.findMany({
    //     where: { hashtags: { some: hashtag } }
    //   })
    // }
    searchPhotosByHashtag: async (root, args) => {
      const hashtag = args.hashtag.startsWith("#") ? args.hashtag : "#" + args.hashtag
      const foundPics = await client.hashtag.findUnique({
        where: { hashtag: hashtag }
      }).photos()
      console.log('foundPics', foundPics)
      return foundPics
    }
  }
}

module.exports = searchPhotosByHashtagResolvers 