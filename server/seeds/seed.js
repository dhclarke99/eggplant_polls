const db = require('../config/connection');
const { Poll } = require('../models');

const pollData = require('./pollData.json');

db.once('open', async () => {
  await Poll.deleteMany({});

  const polls = await Poll.insertMany(pollData);

  console.log('Polls seeded!');
  process.exit(0);
});