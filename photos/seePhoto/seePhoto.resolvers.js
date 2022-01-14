const client = require('../../client.js')


const seePhotoResolvers = {
  Query: {
    seePhoto: async (root, { id }) => {
      try {
        const photoInQ = await client.photo.findUnique({ where: { id } })
        console.log(photoInQ)
        return photoInQ
      }
      catch (error) {
        return null
      }
    }
  }
}

module.exports = seePhotoResolvers 