const db = require('../config/connection');
const { polls } = require('../models');

const pollData = require('./techData.json');

db.eggplantPolls('open', async () => {
  await polls.deleteMany({});

  const polls = await polls.insertMany(pollData);

  console.log('Polls seeded!');
  process.exit(0);
});