const client = require('../../client.js')


const searchPhotosResolvers = {
  Query: {
    searchPhotos: async (root, { keyword }) => {
      return await client.photo.findMany({
        where: { caption: { startsWith: keyword } }
      })
    }
  }
}

module.exports = searchPhotosResolvers 