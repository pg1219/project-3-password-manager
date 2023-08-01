const db = require('../config/connection');
const { Password } = require('../models');

const pwData = require('./pwData.json');

db.once('open', async () => {
  await Password.deleteMany({});

  const passwords = await Password.insertMany(pwData);

  console.log('passwords seeded!');
  process.exit(0);
});
