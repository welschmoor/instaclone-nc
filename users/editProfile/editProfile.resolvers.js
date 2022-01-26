const client = require('../../client.js')
const bcrypt = require('bcrypt')
const fs = require('fs')
const uploadToS3 = require('../../shared/shared.utils.js')

const editProfileResolvers = {
  Mutation: {
    editProfile: async (root, args, context) => {

      if (context.currentUser === null) {
        return { ok: false, error: '401: unauthorized' }
      }

      const { fullName, firstName, lastName, username, email, password, bio, avatar } = args
      let avatarURL = ''
      if (avatar) {
        avatarURL = await uploadToS3(avatar, context.currentUser.id, "avatars")

        // const { filename, createReadStream } = await avatar
        // // create new name for file to be saved in db (to avoid duplicates overwriting files of equal names)
        // const newFileName = `${currentUser.id}-${Date.now()}-${filename}`
        // const readStream = createReadStream()
        // const writeStream = fs.createWriteStream(process.cwd() + '/uploads/' + newFileName)
        // readStream.pipe(writeStream)
        // avatarURL = `http://localhost:4002/static/${newFileName}`
      }

      try {

        let hashedPassword
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10)
        }

        const user = await client.user.update({
          where: { id: context.currentUser.id },
          data: {
            fullName, firstName, password: hashedPassword ? hashedPassword : undefined,
            bio, lastName, email, avatar: avatarURL ? avatarURL : undefined,
          }
        })

        return { ok: true }

      } catch (error) {
        return { ok: false, error: error }
      }
    }
  }
}
module.exports = editProfileResolvers





