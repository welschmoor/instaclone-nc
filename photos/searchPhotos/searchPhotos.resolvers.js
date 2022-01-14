const client = require('../../client.js')


const searchPhotosResolvers = {
  Query: {
    searchPhotos: async (root, args) => {
      await client.photo.findMany({})
    }
  }

}

module.exports = searchPhotosResolvers 