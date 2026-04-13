const cron = require('node-cron');
const { getTargetDate } = require('./utils/helpers');
const { posaljiAnketu } = require('./messages/lunchPoll');

module.exports = (app) => {
  cron.schedule('0 14 * * 1-5', async () => {
    try {
      const targetDate = getTargetDate();
      await posaljiAnketu(app, targetDate);
    } catch (err) {
      console.error('Failed to send lunch poll:', err);
    }
  },
  {
    timezone: 'Europe/Sarajevo',                           
  });
};
