module.exports = {
  apps: [
    {
      name: 'graphql-server',
      script: 'src/app.js',
      'instances': '2',
      // watch: true,
      env: {
        'PORT': 3000,
        'NODE_ENV': 'development'
      },
      env_production: {
        'PORT': 3000,
        'NODE_ENV': 'production',
        'MONGO_HOST': '',
        'MONGO_USER': '',
        'MONGO_PASSWORD': '',
        'MONGO_DB': '/', // The mongodb collection
        'SECRET_KEY': 'someSuperSecretKey'
      }
    }
  ]
}
