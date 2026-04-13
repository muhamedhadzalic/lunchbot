require('dotenv').config();
const app = require('./src/app');
const registerScheduler = require('./src/scheduler');

(async () => {
  registerScheduler(app);
  await app.start(process.env.PORT || 3000);
  console.log('LunchBot is running!');
})();