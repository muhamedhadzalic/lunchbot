const { App } = require('@slack/bolt');
const { buildPollBlocks } = require('./messages/lunchPoll');
const { saveResponse } = require('./db/lunchResponse');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const actionToResponse = {
  'join_lunch': 'JOIN',
  'skip_lunch': 'SKIP',
  'reserve_lunch': 'RESERVE'
};

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function handleLunchAction(actionId) {
  return async ({ ack, body, client }) => {
    try {
      await ack();

      await saveResponse(
        body.user.id,
        body.user.name,
        actionToResponse[actionId],
        getTodayDate()
      );

      await client.chat.update({
        channel: body.channel.id,
        ts: body.message.ts,
        text: 'Ručak anketa',
        blocks: buildPollBlocks(actionId, body.message.blocks[0].text.text),
      });
    } catch (err) {
      console.error(`Failed to handle action ${actionId}:`, err);
    }
  };
}

app.action('join_lunch', handleLunchAction('join_lunch'));
app.action('skip_lunch', handleLunchAction('skip_lunch'));
app.action('reserve_lunch', handleLunchAction('reserve_lunch'));

module.exports = app;