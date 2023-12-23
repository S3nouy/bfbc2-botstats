require('dotenv').config();
const { REST, Routes } = require('discord.js');

const { ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'stats',
    description: 'Displays player stats',
    options: [
      {
        name: 'playername',
        description: 'input a playername',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
      {
    name: 'score',
    description: 'Displays player score',
    options: [
      {
        name: 'playername',
        description: 'input a playername',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully! Check them on Discord !');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
