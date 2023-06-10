import { Client, IntentsBitField } from 'discord.js';

const commands = [
  {
    name: 'claim',
    description: 'Claim your developer badge.',
  },
];

async function runBot(token, req, res) {
  const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

  client.on('ready', async () => {
    await client.application.commands.set(commands);

    setTimeout(() => {
      client.destroy();
    }, 120000);
  });

  client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand) return;

    if (interaction.commandName === 'claim') {
      interaction.reply({
        content:
          'Command ran! You can now head over to https://discord.com/developers/active-developer to claim your developer badge. You may have to wait up to 24 hours for Discord to update your account.',
        ephemeral: true,
      });

      setTimeout(() => {
        client.destroy();
      }, 1000);
    }
  });

  client
    .login(token)
    .then(() => {
      res.status(200).json({
        id: `${client.user.id}`,
        username: `${client.user.username}`,
        inviteURL: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=3072&scope=bot%20applications.commands`,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: true, message: `Error logging in: ${err}` });
    });
}

export default async function handler(req, res) {
  if (!(req.method === 'POST')) return res.redirect('/');

  const { token } = req.body;

  if (!token) return res.status(400).json({ error: true, message: 'Token is required' });
  try {
    await runBot(token, req, res);
  } catch (error) {
    res.status(500).json({ error: true, message: `Something went wrong: ${error}` });
  }
}
