/*
 * Discord Bot for Player Stats
 * Developed by Senouy aka CptYunsXD
 */

require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const prefix = '!';
client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (command === 'stats') {
            const username = args.join(' ');
            try {
                const apiUrl = `http://api.emulatornexus.com/v1/rome/persona/${username}/stats`;
                const response = await axios.get(apiUrl);
                if (response.data.kills) {
                    const stats = response.data;
                    const kills = stats.kills;
                    const deaths = stats.deaths;
                    const kdRatio = deaths === 0 ? kills : (kills / deaths).toFixed(2);
                    const totalHoursPlayed = (stats.time / 3600).toFixed(2);
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Player Stats')
                        .setColor('#0099ff')
                        .addField('Player Name', username)
                        .addField('Kills', kills, true)
                        .addField('Deaths', deaths, true)
                        .addField('K/D Ratio', kdRatio, true)
                        .addField('Knife Kills', stats.c_knv__kw_g)
                        .addField('Wins', stats.wins, true)
                        .addField('Losses', stats.losses, true)
                        .addField('Team Kills', stats.teamkills, true)
                        .addField('Total Hours Played', totalHoursPlayed)
                        .setImage('https://i.ibb.co/6sZvccF/battlefield-bad-company-key-art-jpg-adapt-crop191x100-628p.jpg');
                    message.channel.send(embed);
                } else {
                    message.channel.send('Player stats not found.');
                }
            } catch (error) {
                console.error('Error fetching or parsing stats:', error);
                message.channel.send('Error fetching player stats. Please try again later.');
            }
        } else if (command === 'help') {
            // Respond with a help message
            const helpMessage = 'Here are the available commands:\n' +
                '`!stats <username>` - Display player stats';
            message.channel.send(helpMessage);
        }
    }
});
client.login(process.env.BOT_TOKEN);
