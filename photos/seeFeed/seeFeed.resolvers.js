const client = require('../../client.js')


const seeFeedResolvers = {
  Query: {
    seeFeed: async (root, args, { currentUser }) => {

      /* CHECK LOGIN */  if (!currentUser || currentUser === null) {
        return { ok: false, error: "401: not logged in" }
      }

      // you should implement pagination for this!
      // with OR we see both others and our own pics
      const photos = await client.photo.findMany({
        where: {
          OR: [
            {
              user: { followers: { some: { id: currentUser.id } } }
            },
            {
              user: { id: currentUser.id }
            }
          ]
        },
        orderBy: {
          createdAt: "desc"
        }
      })
      return photos
    }
  }
}

module.exports = seeFeedResolvers 