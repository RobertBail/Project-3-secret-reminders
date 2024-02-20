const db = require('../config/connection');
const { User, Reminder } = require('../models');
const reminderSeeds = require('./reminderSeeds.json');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Reminder', 'reminders');

  await cleanDB('User', 'users');

  await User.create(userSeeds);

  await Reminder.create(reminderSeeds);

  console.log('all done!');
  process.exit(0);
});
