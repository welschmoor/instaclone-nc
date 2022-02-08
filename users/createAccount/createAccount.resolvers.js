const client = require('../../client.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createAccountResolvers = {
  Mutation: {
    createAccount: async (root, args) => {
      const { fullName, firstName, lastName, email, password, username, } = args
      try {
        // check if username already in DB
        const existingUser = await client.user.findFirst({ where: { OR: [{ username }, { email }] } })
        if (existingUser) {
          return { ok: false, error: "User with this email or username already exists" }
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        // save and return user
        await client.user.create({
          data: { fullName, firstName, lastName, email, username, password: hashedPassword, avatar: "https://instacloneupload1337.s3.eu-central-1.amazonaws.com/avatars/2-1644268789980-avatarDefault2.jpg" }
        })
        return { ok: true }
      } catch (error) {
        console.log(error)
        return { ok: false, error: error }
      }
    },
  }
}
module.exports = createAccountResolvers



