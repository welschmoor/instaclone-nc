const client = require('../../client.js')

const uploadPhotoResolvers = {
  Mutation: {
    uploadPhoto: async (_, { file, caption }, { currentUser }) => {

      /* CHECK LOGIN */  if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      try {
        let hashtagArrObj = undefined;
        if (caption) {
          const hashtagArr = caption.match(/#[\w]+/g) || []
          hashtagArrObj = hashtagArr.map(hashtag => ({ where: { hashtag }, create: { hashtag } }))
        }

        const photo = await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: currentUser.id,
              }
            },
            hashtags: hashtagArrObj && { connectOrCreate: hashtagArrObj }
          }
        })
        return { ok: true, photo }
      }
      catch (error) {
        return { ok: false, error }
      }
    },
  }
}

module.exports = uploadPhotoResolvers 