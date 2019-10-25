const { config } = require('./src/config/app')

const baseConfig = {
  'type': 'postgres',
  'host': config.get('db.host'),
  'port': config.get('db.port'),
  'username': config.get('db.username'),
  'password': config.get('db.password'),
  'database': config.get('db.name'),
  'logging': false,
  'synchronize': false,
  'migrationsRun': false,
  'ssl': true,
  'cache': {
    'type': 'redis',
    'options': {
      'url': config.get('redis.url')
    }
  }
}

module.exports = {
  ...baseConfig,
  'entities': [
    './dist/src/entity/**/*.js'
  ],
  'migrations': [
    './dist/src/migration/**/*.js'
  ]
}

module.exports.baseConfig = baseConfig
