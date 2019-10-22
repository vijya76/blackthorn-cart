const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'blackthorn',
      env: 'APP_NAME'
    },
    base_url: {
      doc: 'Base URL of platform',
      format: String,
      default: 'https://www.blackthorn.ml/',
      env: 'BASE_URL'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8080,
      env: 'PORT'
    }
  },

  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  db: {
    name: {
      doc: 'Database Name',
      format: String,
      default: '',
      env: 'DB_NAME',
      sensitive: true
    },
    username: {
      doc: 'Database user',
      format: String,
      default: '',
      env: 'DB_USER',
      sensitive: true
    },
    password: {
      doc: 'Database password',
      format: '*',
      default: null,
      env: 'DB_PASSWORD',
      sensitive: true
    },
    host: {
      doc: 'DB host',
      format: String,
      default: '',
      env: 'DB_HOST',
      sensitive: true
    },
    port: {
      doc: 'DB PORT',
      format: 'port',
      default: '5432',
      env: 'DB_PORT',
      sensitive: true
    }
  },

  logger: {
    level: {
      doc: 'Log level',
      format: ['silly', 'debug', 'verbose', 'info', 'warn', 'error'],
      default: 'debug',
      env: 'LOG_LEVEL'
    }
  }
})

console.log('Starting service with', config.toString())
config.validate({ allowed: 'strict' })

module.exports.config = config
