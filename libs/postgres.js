const { Client } = require('pg');

async function getConnection(params) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'home',
    password: 'MyCommunitiesHome',
    database: 'my_list',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
