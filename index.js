/*
 * Discord Bot for Player Stats
 * Developed by Senouy aka CptYunsXD
 */


require('dotenv').config();
const axios = require('axios');
const {
    Client,
    GatewayIntentBits,
    ActivityType
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', () => {
    console.log(`✅ ${client.user.tag} is online.`);

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const username = interaction.options.getString('playername');

        // If you want to hide your stats from other users input your game name below.
        if (username.toLowerCase() === 'playername') { // <-your_battlefield_nickname_here (write it in lowercase)
            interaction.reply({
                content: `Nice try. Ayo boss <@your_discord_id> check out this fool tryna get your ${interaction.commandName === 'stats' ? 'stats' : 'stats'}.`, // change `your_discord_id` if you want the bot to ping you when a user requests your stats.
            });
            return; // Exit the command handling for your specific username
        }
        if (interaction.commandName === 'score') {
            try { // Getting the score data from the API
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
                        fields: [{
                                name: 'Player Name',
                                value: username,
                                inline: true
                            },
                            {
                                name: 'Assault score',
                                value: stats.sc_assault.toString()
                            },
                            {
                                name: 'Enginner score',
                                value: stats.sc_demo.toString()
                            },
                            {
                                name: 'Recon score',
                                value: stats.sc_recon.toString()
                            },
                            {
                                name: 'Medic score',
                                value: stats.sc_support.toString()
                            },

                        ],
                        timestamp: new Date().toISOString(),
                    };

                    interaction.reply({
                        embeds: [exampleEmbed]
                    });
                }
            } catch (error) {
                console.error('Error fetching or parsing score:', error);
                interaction.reply('Error fetching player score. Please try again later.');
            }
        }
        if (interaction.commandName === 'stats') {
            try { // Getting the stats data from the API
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
                        fields: [{
                                name: 'Player Name',
                                value: username,
                                inline: true
                            },
                            {
                                name: 'Total Hours Played',
                                value: totalHoursPlayed.toString(),
                                inline: true
                            },
                            {
                                name: 'Knife Kills',
                                value: knifeKills.toString(),
                                inline: true
                            },
                            {
                                name: 'Kills',
                                value: stats.kills.toString(),
                                inline: true
                            },
                            {
                                name: 'Deaths',
                                value: stats.deaths.toString(),
                                inline: true
                            },
                            {
                                name: 'K/D Ratio',
                                value: kdRatio.toString(),
                                inline: true
                            },
                            {
                                name: 'Wins',
                                value: stats.wins.toString(),
                                inline: true
                            },
                            {
                                name: 'Losses',
                                value: stats.losses.toString(),
                                inline: true
                            },
                            {
                                name: 'Team Kills',
                                value: teamKills.toString(),
                                inline: true
                            },

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

                    interaction.reply({
                        embeds: [exampleEmbed]
                    });
                }
            } catch (error) {
                console.error('Error fetching or parsing stats:', error);
                interaction.reply('Error fetching player stats. Please try again later.');
            }
        }
    });
});

client.login(process.env.TOKEN);
