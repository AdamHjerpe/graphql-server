const authResolver = require('./auth')
const bookingResolver = require('./booking')
const eventshResolver = require('./events')

const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...eventshResolver
}

module.exports = rootResolver
