const client = require('../../client.js')
const bcrypt = require('bcrypt')
const fs = require('fs')


const editProfileResolvers = {
  Mutation: {
    editProfile: async (root, args, context) => {

      if (context.currentUser === null) {
        return { ok: false, error: '401: unauthorized' }
      }

      const { firstName, lastName, username, email, password, bio, avatar } = args
      console.log("avatar", avatar)
      const { filename, createReadStream } = await avatar
      const readStream = createReadStream()
      const writeStream = fs.createWriteStream(process.cwd() + '/uploads/' + filename)
      readStream.pipe(writeStream)


      try {

        let hashedPassword
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10)
        }

        const user = await client.user.update({
          where: { id: context.currentUser.id },
          data: { firstName, password: hashedPassword ? hashedPassword : undefined, bio }
        })

        return { ok: true }

      } catch (error) {
        return { ok: false, error: error }
      }
    }
  }
}
module.exports = editProfileResolvers





