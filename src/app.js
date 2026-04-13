const { App } = require('@slack/bolt');
const { buildPollBlocks } = require('./messages/lunchPoll');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

function handleLunchAction(actionId) {
  return async ({ ack, body, client }) => {
    try {
      await ack();
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