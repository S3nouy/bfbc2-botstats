# Discord Bot for Battlefield: Bad Company 2 Stats Nexus Backend
## Credits
Senouy -bot developement

NoFaTe -providing API

This Discord bot retrieves and displays player statistics for Battlefield: Bad Company 2 using the Emulator Nexus API.

## Prerequisites

- Node.js
- Discord.js@12.5.3
- Axios
- A Discord Bot Token

## Installation

1. Clone this repository to your local machine.

   `git clone https://github.com/S3nouy/bfbc2-botstats.git`

2. Change directory to bfbc2-botstas and install the required dependencies using npm:

   `npm install discord.js@12.5.3 axios dotenv`
   
3. Edit the .env file
   
   BOT_TOKEN=`your_bot_token_here`

4. Run the bot using the following command:

   `node discord-bot.js`

## Usage


   !stats `player_name`

Replace `player_name` with the Battlefield: Bad Company 2 player name you want to retrieve statistics for.
