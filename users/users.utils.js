const jwt = require('jsonwebtoken')
const client = require('../client.js')

const getUser = async (token) => {
  if (!token) return null;

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET)
    const currentUser = await client.user.findUnique({ where: { id: decodedToken.id } })

    if (currentUser.id) return currentUser;
    return null
    
  }
  catch (error) {
    return null
  }
}

module.exports = getUser