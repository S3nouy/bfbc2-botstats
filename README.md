# Discord Bot for Battlefield: Bad Company 2 Stats Nexus Backend
## Credits
Senouy -bot developement

NoFaTe -providing API

This Discord bot retrieves and displays player statistics for Battlefield: Bad Company 2 using the Emulator Nexus API.

## Prerequisites

- Node.js
- Discord.js@latest
- Axios
- Dotenv
- A Discord Bot Token

## Installation

1. Clone this repository to your local machine.

   `git clone https://github.com/S3nouy/bfbc2-botstats.git`

2. Change directory to bfbc2-botstats and install the required dependencies using npm:

   `npm install discord.js@latest axios dotenv`
   
3. Edit the .env file
   
   `BOT_TOKEN=your_bot_token_here`
   `CLIENT_ID=owner_discord_id`
   `GUILD_ID=discord_server_id`

4. Edit the config.json file

   "token": "your_bot_token_here",
   "clientId": "owner_discord_id",
   "guildId": "discord_server_id"

5. Upload commands to Discord by using the following command:

   `node register-commands.js`

![asset2](https://github.com/S3nouy/bfbc2-botstats/assets/77050462/6523badb-b6b4-4ddf-baca-b1e78a05ee12)

6. Finally start the bot using the following command:

   `node index.js`



## Usage

   /stats `player_name`

Replace `player_name` with the Battlefield: Bad Company 2 player name you want to retrieve stats for.

   /score `playername`

Replace `player_name` with the Battlefield: Bad Company 2 player name you want to retrieve score for.

## Additional notes
Check index.js if you want to protect your stats from being show to other users.
It will look like this.
![asset1](https://github.com/S3nouy/bfbc2-botstats/assets/77050462/8ff73f2f-839b-4a3d-bdcf-6180d1fca6b9)
