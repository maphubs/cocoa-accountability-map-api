// Update with your config settings.
const config = require('./config')

module.exports = {

  development: {
    client: 'pg',
    connection: config.connection.url,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      schemaName: 'public',
      tableName: 'cam_api_knex_migrations'
    },
    seeds: {
      directory: '../seeds/dev'
    }
  },

  staging: {
    client: 'pg',
    connection: config.connection.url,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      schemaName: 'public',
      tableName: 'cam_api_knex_migrations'
    },
    seeds: {
      directory: '../seeds/staging'
    }
  },

  production: {
    client: 'pg',
    connection: config.connection.url,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      schemaName: 'public',
      tableName: 'cam_api_knex_migrations'
    },
    seeds: {
      directory: './prod-seeds/production'
    }
  }
}
