const client = require('../../client.js')


const editPhotoResolvers = {
  Mutation: {
    editPhoto: async (root, { id, caption }, { currentUser }) => {
      console.log("start")
      if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      // the reason we use findFirst is it allows by userId search
      // findUnique only allows search by unique fields.
      const photo = await client.photo.findFirst({
        where: {
          id: id,
          userId: currentUser.id,
        },
        include: { hashtags: { select: { hashtag: true } } }
      })

      if (!photo) {
        return { ok: false, error: "401: not logged in" }
      }

      let hashtagArrObj = undefined;
      if (caption) {
        const hashtagArr = caption.match(/#[\w]+/g) || []
        hashtagArrObj = hashtagArr.map(hashtag => ({ where: { hashtag }, create: { hashtag } }))
      }

      // we disconnect hashtags because we make new ones based on new caption
      // using connectOrCreate
      await client.photo.update({
        where: { id: id },
        data: {
          caption,
          hashtags: {
            disconnect: photo.hashtags,
            connectOrCreate: hashtagArrObj
          },
        },
      })
      return { ok: true }
    },
  }
}

module.exports = editPhotoResolvers 