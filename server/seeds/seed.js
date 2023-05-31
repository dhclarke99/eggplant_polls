const db = require('../config/connection');
const { Poll } = require('../models');
const { User } = require('../models');

const pollData = require('./pollData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await Poll.deleteMany({});
  await User.deleteMany({});

  const polls = await Poll.insertMany(pollData);
  const users = await User.insertMany(userData);

  console.log('Polls and Users seeded!');
  process.exit(0);
});