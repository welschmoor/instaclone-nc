const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient() // forgot const here!

module.exports = client