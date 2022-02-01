const client = require('../../client.js')


const seeFeedResolvers = {
  Query: {
    seeFeed: async (root, args, { currentUser }) => {

      /* CHECK LOGIN */  if (!currentUser || currentUser === null) {
        return []
      }
      let cursor = args.cursor
      if (cursor === 0) { cursor = undefined } // this is just for the 1st page

      // you should implement pagination for this!
      // with OR we see both others and our own pics
      const photos = await client.photo.findMany({
        take: cursor,
        skip: 0,

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


// old code:

// const photos = await client.photo.findMany({
//   take: 4,
//   skip: cursor ? 1 : 0,
//   cursor: cursor ? { id: cursor } : undefined,
//   where: {
//     OR: [
//       {
//         user: { followers: { some: { id: currentUser.id } } }
//       },
//       {
//         user: { id: currentUser.id }
//       }
//     ]
//   },
//   orderBy: {
//     createdAt: "desc"
//   }
// })