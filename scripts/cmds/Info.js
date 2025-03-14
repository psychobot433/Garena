const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    aliases: ["infor", "in4"],
    version: "2.0",
    author: "Anthony | Edited by Xos Eren",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      en: "Sends information about the bot and admin along with an image."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, api }) {
    await this.sendInfo(message, api);
  },

  onChat: async function ({ event, message, api }) {
    if (event.body && event.body.toLowerCase() === "info") {
      await this.sendInfo(message, api);
    }
  },

  sendInfo: async function (message, api) {
    try {
      const botName = "🕸️ 𝐒𝐩𝐢𝐝𝐞𝐘🕷️";
      const botPrefix = "𝐄𝐫𝐞𝐧";
      const authorName = "𝐑𝐚𝐚𝐝";
      const authorFB = "𝐑𝐚 𝐀𝐚𝐝";
      const authorInsta = "raadx102";
      const status = "𝗦𝗶𝗻𝗴𝗹𝗲";

      // Load JSON file safely
      let urls;
      try {
        if (fs.existsSync('scripts/cmds/assets/Ayan.json')) {
          urls = JSON.parse(fs.readFileSync('scripts/cmds/assets/Ayan.json'));
        } else {
          urls = ["https://i.imgur.com/PjuPA48.jpeg"]; // Default fallback image
        }
      } catch (err) {
        console.error("Error reading JSON file:", err);
        urls = ["https://i.imgur.com/PjuPA48.jpeg"];
      }

      const link = urls[Math.floor(Math.random() * urls.length)];

      const now = moment().tz('Asia/Dhaka');
      const date = now.format('MMMM Do YYYY');
      const time = now.format('h:mm:ss A');

      const uptime = process.uptime();
      const seconds = Math.floor(uptime % 60);
      const minutes = Math.floor((uptime / 60) % 60);
      const hours = Math.floor((uptime / (60 * 60)) % 24);
      const days = Math.floor(uptime / (60 * 60 * 24));
      const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      const sentMessage = await message.reply("🔄 Loading…");

      const messageContent = `
         🎀 𝐀𝐝𝐦𝐢𝐧 𝐈𝐧𝐟𝐨 ☮
──────────────────
☮ 𝐍𝐚𝐦𝐞: ${authorName}  

☮ 𝐅𝐛: ${authorFB}  

☮ 𝐏𝐫𝐞𝐟𝐢𝐱: ${botPrefix}  

☮ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: ${status}
  
☮ 𝐈𝐠: ${authorInsta}  

☮ 𝐓𝐢𝐦𝐞: ${time}  

☮ 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptimeString}  

☮ 𝐁𝐨𝐭: ${botName}  
──────────────────`;

      await api.editMessage(messageContent, sentMessage.messageID);

    } catch (err) {
      console.error("Error in sendInfo function:", err);
      return message.reply("❌ An error occurred while fetching system statistics.");
    }
  }
};
