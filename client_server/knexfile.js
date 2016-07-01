require('dotenv').load();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/jerkless'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
