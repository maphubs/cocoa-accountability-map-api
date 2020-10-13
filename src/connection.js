const connection = require('./config').connection.url
const log = require('@bit/kriscarle.maphubs-utils.maphubs-utils.log')
const knex = require('knex')({
  client: 'pg',
  connection,
  debug: false,
  pool: {
    min: 2,
    max: 25,
    afterCreate (conn, done) {
      conn.on('error', (connectionError) => {
        if (connectionError) {
          log.error(connectionError.message)
        }
      })
      done(null, connection)
    }
  },
  acquireConnectionTimeout: 60000
})

module.exports = knex
