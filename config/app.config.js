module.exports = {
  port: 5000,
  mongoUri: 'mongodb+srv://viktoriia:viktoriia12@cluster0.8lcse.mongodb.net/Finance?retryWrites=true&w=majority',
  jwt: {
    secret: 'secret_key_vika',
    tokens: {
      access: {
        type: 'access',
        expiresIn: 3600,
      },
      refresh: {
        type: 'refresh',
        expiresIn: 3600,
      },
    },
  },
}
