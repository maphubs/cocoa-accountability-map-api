require('dotenv').config()
const getenv = require('getenv')

const config = {
  connection: {
    url: `postgres://${getenv('DB_USER')}:${getenv('DB_PASS')}@${getenv('DB_HOST')}:${getenv('DB_PORT')}/${getenv('DB_DATABASE')}`
  },
  internal_port: getenv('INTERNAL_PORT'),
  LATEST_MONTH: getenv('LATEST_MONTH')
}

module.exports = config
