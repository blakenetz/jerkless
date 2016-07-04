require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/jerkless',
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    }
  }
};
