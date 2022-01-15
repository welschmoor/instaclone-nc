const client = require('../../client.js');
const uploadToS3 = require('../../shared/shared.utils.js');

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

        const fileURL = await uploadToS3(file, currentUser.id, "uploads")
        const photo = await client.photo.create({
          data: {
            file: fileURL,
            caption: caption,
            user: {
              connect: {
                id: currentUser.id,
              }
            },
            hashtags: hashtagArrObj && { connectOrCreate: hashtagArrObj }
          }
        })
        return { ok: true, photoUrl: photo.file }
      }
      catch (error) {
        return { ok: false, error }
      }
    },
  }
}

module.exports = uploadPhotoResolvers 