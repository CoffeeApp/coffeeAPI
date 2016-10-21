// Update with your config settings.
const path = require('path')

const PATHS = {
  development: path.join(__dirname, '/data/coffeeAPI.sqlite'),
  test: path.join(__dirname, '/data/test.sqlite'),
  production: path.join(__dirname, '/data/coffee.sqlite'),
  migrations: path.join(__dirname, '/data/migrations'),
  seeds: path.join(__dirname, '/data/seeds')
}
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: PATHS.development
    },
    migrations: {
      directory: PATHS.migrations,
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: PATHS.production
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: PATHS.migrations,
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }

};
