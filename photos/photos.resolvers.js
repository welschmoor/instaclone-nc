const client = require('../client.js')


const photosResolvers = {

  Query: {
    dummyR: () => "hello"
  },


  Photo: {
    user: async (root, args, context) => {
      // wee look at the userId of which is saved in photo that is being requested
      // and we then find the user in user db to retrieve username or whatever
      return await client.user.findUnique({ where: { id: root.userId } })
    },


    hashtags: async (root, args, context) => {
      // we use photo id root.id to find hashtags
      return await client.hashtag.findMany({
        where: {
          photos: {
            some: { id: root.id }
          }
        }
      })
    },


    likes: async (root, args) => {
      return await client.like.count({
        where: {
          photoId: root.id
        }
      })
    },


    // how many comments:
    commentsNumber: async (root, args) => {
      return await client.comment.count({
        where: { photoId: root.id }
      })
    },

    // comments: async ({ id }) => {
    //   return await client.comment.findMany({
    //     where: { photoId: id },
    //     include: { user: true }
    //   })
    // },

    comments: async ({ id }) => {
      return await client.photo.findUnique({
        where: { id: id }
      }).comments({ include: { user: true } })
    },



    isMine: async (root, _, { currentUser }) => {
      /* CHECK LOGIN */  if (!currentUser || currentUser === null) {
        return false
      }

      if (currentUser.id === root.userId) {
        return true
      }
      return false
    },


    isLikedByMe: async (root, args, { currentUser }) => {
      /* CHECK LOGIN */  if (!currentUser || currentUser === null) {
        return false
      }

      const likeInQ = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: root.id,
            userId: currentUser.id,
          }
        },
        select: { id: true }
      })

      console.log("likeInQ", likeInQ)

      if (likeInQ) return true;
      return false;
    },

  },


  Hashtag: {
    totalPhotos: async (root, args) => {
      console.log(root)
      const picsCount = await client.photo.count({
        where: { hashtags: { some: { hashtag: root.hashtag } } }
      })
      console.log("totalPacs", picsCount)
      return picsCount
    },
    photos: async (root, { page }) => {
      console.log(page)
      return await client.hashtag.findUnique({ where: { id: root.id } }).photos()
    },
  }
}


module.exports = photosResolvers