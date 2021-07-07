module.exports = {
  ROUTE_NOT_FOND: 'Rout not fond',
  PORT: process.env.PORT || 3000,
  UNKNOWN_ERROR: 'Unknown error',
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/hw',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'SuperSecret',
  AUTHORIZATION: 'Authorization',
  ACCESS_TOKEN_TIME: '10m',
  REFRESH_TOKEN_TIME: '30d'
};
