const client = require('../../client.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginResolvers = {
  Mutation: {
    login: async (root, { username, password }) => {
      try {
        const userInQ = await client.user.findUnique({ where: { username } })
        if (!userInQ) {
          return { ok: false, error: "username does not exist", }
        }

        const passwordOK = await bcrypt.compare(password, userInQ.password)
        if (!passwordOK) {
          return { ok: false, error: "Wrong password!" }
        }

        const userForToken = {
          username: userInQ.username,
          id: userInQ.id,
        }

        const token = await jwt.sign(
          userForToken,
          process.env.SECRET,
          { expiresIn: "2 days" }
        )
        console.log("token", token)
        return { ok: true, token: token }

      } catch (error) {
        return error
      }
    },

  }
}
module.exports = loginResolvers





