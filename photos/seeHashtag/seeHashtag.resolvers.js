const client = require('../../client.js')


const seeHashtagResolvers = {
  Query: {
    seeHashtag: async (root, args) => {
      const hashtag = args.hashtag.startsWith("#") ? args.hashtag : "#" + args.hashtag
      console.log(hashtag)
      return await client.hashtag.findUnique({ where: { hashtag: args.hashtag } })
    }
  }

}

module.exports = seeHashtagResolvers 