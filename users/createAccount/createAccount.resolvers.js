const client = require('../../client.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createAccountResolvers = {
  Mutation: {
    createAccount: async (root, args) => {
      const { firstName, lastName, email, password, username, } = args
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
          data: { firstName, lastName, email, username, password: hashedPassword }
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



