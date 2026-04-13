const { getDayName } = require('../utils/helpers');

async function posaljiAnketu(app, targetDate) {
  const dayName = getDayName(targetDate);
  const headerText = `*Ručak za ${dayName}* 🍽️\nDa li dolazite?`;

  await app.client.chat.postMessage({
    channel: process.env.LUNCH_CHANNEL_ID,
    text: 'Ručak anketa',
    blocks: buildPollBlocks(null, headerText),
  });
}

function buildPollBlocks(selected = null, headerText = null) {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: headerText || '*Da li dolazite na ručak? 🍽️*',
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: selected === 'join_lunch' ? '✅ Dolazim' : 'Dolazim',
          },
          action_id: 'join_lunch',
          ...(selected === 'join_lunch' && { style: 'primary' }),
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: selected === 'skip_lunch' ? '❌ Ne dolazim' : 'Ne dolazim',
          },
          action_id: 'skip_lunch',
          ...(selected === 'skip_lunch' && { style: 'danger' }),
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: selected === 'reserve_lunch' ? '📦 Ostavi porciju' : 'Ostavi porciju',
          },
          action_id: 'reserve_lunch',
          ...(selected === 'reserve_lunch' && { style: 'primary' }),
        },
      ],
    },
  ];
}

module.exports = { buildPollBlocks, posaljiAnketu };
