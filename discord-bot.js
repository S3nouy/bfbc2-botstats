/*
 * Discord Bot for Player Stats
 * Developed by Senouy aka CptYunsXD
 */

require('dotenv').config(); // Load environment variables from .env file

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
            const username = args[0];

            // Make a request to the Nexus API with the username
            try {
                const apiUrl = `http://api.emulatornexus.com/v1/rome/persona/${username}/stats`;
                const response = await axios.get(apiUrl);

                // Parse the JSON response here and extract the relevant stats
                const stats = parseStatsFromJSON(response.data.data);

                // Calculate K/D ratio
                const kills = stats.kills;
                const deaths = stats.deaths;
                const kdRatio = deaths === 0 ? kills : (kills / deaths).toFixed(2);

                // Create an embed with the extracted stats
                const embed = new Discord.MessageEmbed()
                    .setTitle('Player Stats')
                    .setColor('#0099ff')
                    .addField('Player Name', username)
                    .addField('Kills', kills, true)
                    .addField('Deaths', deaths, true)
                    .addField('K/D Ratio', kdRatio, true)
                    .addField('Knife Kills', stats.knifeKills)
                    .setImage('https://i.ibb.co/6sZvccF/battlefield-bad-company-key-art-jpg-adapt-crop191x100-628p.jpg'); // Set the URL of the knife image

                // Send the embed as a message
                message.channel.send(embed);
            } catch (error) {
                console.error('Error fetching or parsing stats:', error);
                message.channel.send('Error fetching player stats. Please try again later.');
            }
        }
    }
});

// Function to parse the stats from the JSON response
function parseStatsFromJSON(data) {
    return {
        kills: data.kills,
        deaths: data.deaths,
        knifeKills: data.c_knv__kw_g,
        // Add other stats properties here
    };
}

client.login(process.env.BOT_TOKEN); // Use the BOT_TOKEN from the .env file
