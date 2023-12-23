require('dotenv').config();
const axios = require('axios');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to update the custom status
const updateCustomStatus = () => {
  try {
    const serverId = '1115629869410308116';
    const roleName = 'Battlefield';

    const guild = client.guilds.cache.get(serverId);

    if (guild) {
      const battlefieldRole = guild.roles.cache.find(role => role.name === roleName);

      if (battlefieldRole) {
        const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(battlefieldRole.id)).size;
        const statusText = `${membersWithRole} Aces`;

        client.user.setActivity(statusText, { type: 'WATCHING' }); // Use WATCHING type
        console.log('Custom status updated:', statusText);
      } else {
        console.error(`Role '${roleName}' not found in server '${serverId}'.`);
      }
    } else {
      console.error(`Server '${serverId}' not found.`);
    }
  } catch (error) {
    console.error('Error updating custom status:', error);
  }
};

client.on('ready', () => {
  console.log(`✅ ${client.user.tag} is online.`);

  // Initial update and set an interval to update every 8 hours (or your desired interval)
  updateCustomStatus();
  setInterval(updateCustomStatus, 8 * 60 * 60 * 1000); // 8 hours in milliseconds

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const username = interaction.options.getString('playername');

    // Check if the username is "CptYunsXD"
    if (username.toLowerCase() === 'haha') {
      interaction.reply({
        content: `Nice try. Ayo boss <@596104110294695937> check out this fool tryna get your ${interaction.commandName === 'stats' ? 'stats' : 'age'}.`,
      });
      return; // Exit the command handling for this specific username
    }
    if (interaction.commandName === 'score') {
      try {
        const apiUrl = `http://api.emulatornexus.com/v1/rome/persona/${username}/stats`;
        const response = await axios.get(apiUrl);

        if (response.data) {
          const stats = response.data;
          const sc_recon = stats.sc_recon;
          const sc_support = stats.sc_support;
          const sc_assault = stats.sc_assault;
          const sc_demo = stats.sc_demo;

          // Create a MessageEmbed
          const exampleEmbed = {
            color: 0x0099ff,
            title: 'Player Score',
            fields: [
	      { name: 'Player Name', value: username, inline: true },
              { name: 'Assault score', value: stats.sc_assault.toString()},
              { name: 'Enginner score', value: stats.sc_demo.toString()},
              { name: 'Recon score', value: stats.sc_recon.toString()},
              { name: 'Medic score', value: stats.sc_support.toString()},

            ],
		timestamp: new Date().toISOString(),
          };

          interaction.reply({ embeds: [exampleEmbed] });
        }
      } catch (error) {
        console.error('Error fetching or parsing score:', error);
        interaction.reply('Error fetching player score. Please try again later.');
      }
    } 
    if (interaction.commandName === 'stats') {
      try {
        const apiUrl = `http://api.emulatornexus.com/v1/rome/persona/${username}/stats`;
        const response = await axios.get(apiUrl);

        if (response.data) {
          const stats = response.data;
          const kills = stats.kills;
          const deaths = stats.deaths;
          const kdRatio = deaths === 0 ? kills : (kills / deaths).toFixed(2);
          const totalHoursPlayed = (stats.time / 3600).toFixed(2);
          const Wins = stats.wins;
          const Losses = stats.losses;
          const teamKills = stats.teamkills;
          const knifeKills = stats.c_knv__kw_g;

          // Log values for debugging
          console.log(`Team Kills: ${teamKills}`);
          console.log(`Knife Kills: ${knifeKills}`);

          // Create a MessageEmbed
          const exampleEmbed = {
            color: 0x0099ff,
            title: 'Player Stats',
            fields: [
	      { name: 'Player Name', value: username, inline: true },
              { name: 'Total Hours Played', value: totalHoursPlayed.toString(), inline: true  },
              { name: 'Knife Kills', value: knifeKills.toString(), inline: true },
              { name: 'Kills', value: stats.kills.toString(), inline: true },
              { name: 'Deaths', value: stats.deaths.toString(), inline: true },
              { name: 'K/D Ratio', value: kdRatio.toString(), inline: true },
              { name: 'Wins', value: stats.wins.toString(), inline: true },
              { name: 'Losses', value: stats.losses.toString(), inline: true },
              { name: 'Team Kills', value: teamKills.toString(), inline: true  },

            ],
            image: {
              url: 'https://i.ibb.co/6sZvccF/battlefield-bad-company-key-art-jpg-adapt-crop191x100-628p.jpg',
            },
            timestamp: new Date().toISOString(),
            footer: {
              text: 'Keep dominating the Battlefield!',
	      icon_url: 'https://cdn.discordapp.com/emojis/1169982661440323654.webp?size=48&quality=lossless',
            },
          };

          interaction.reply({ embeds: [exampleEmbed] });
        }
      } catch (error) {
        console.error('Error fetching or parsing stats:', error);
        interaction.reply('Error fetching player stats. Please try again later.');
      }
    } else if (interaction.commandName === 'age') {
      try {
        const apiUrl = `http://api.emulatornexus.com/v1/rome/persona/${username}/stats`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.i27_01) {
          const i27_01Value = response.data.i27_01;
          const accountAgeDays = i27_01Value;
          const accountAgeMilliseconds = accountAgeDays * 24 * 60 * 60 * 1000;
          const accountAgeDate = new Date('January 1, 2008');
          accountAgeDate.setTime(accountAgeDate.getTime() + accountAgeMilliseconds);

          const now = new Date();
          const ageDifference = now - accountAgeDate;
          const ageInSeconds = Math.floor(ageDifference / 1000);
          const ageMinutes = Math.floor(ageInSeconds / 60);
          const ageHours = Math.floor(ageMinutes / 60);
          const ageDays = Math.floor(ageHours / 24);
          const ageYears = Math.floor(ageDays / 365);

          // Calculate the "first time seen" date
          const firstTimeSeenDate = new Date('January 1, 2008');
          firstTimeSeenDate.setTime(firstTimeSeenDate.getTime() + accountAgeMilliseconds);

          // Format both the account age and "first time seen" dates
          const ageMessage = `Account age for ${username}:\n${ageYears} years ${ageDays % 365} days ${ageHours % 24} hours ${ageMinutes % 60} minutes ${ageInSeconds % 60} seconds`;
          const firstTimeSeenMessage = `First time seen for ${username}:\n${firstTimeSeenDate.toUTCString()}`;

          // Send both messages
          console.log('Account Age:', ageMessage);
          console.log('First Time Seen:', firstTimeSeenMessage);

          interaction.reply({ content: ageMessage }); // sending only ageMessage for simplicity
        } else {
          console.log('Player not found:', username);
          interaction.reply(`Player ${interaction.commandName} not found.`);
        }
      } catch (error) {
        console.error('Error fetching or calculating account age:', error);
        interaction.reply('An error occurred while processing the command. Please try again.');
      }
    }
  });
});

client.login(process.env.TOKEN);
