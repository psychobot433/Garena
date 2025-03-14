fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "ArYan | Edited by Xos Eren",
    countDown: 5,
    role: 0,
    category: "info",
    guide: {
      en: "{pn} / help cmdName",
    },
    priority: 1,
  },

  onStart: async function ({ message, args }) {
    await this.sendHelp(message, args);
  },

  onChat: async function ({ event, message }) {
    if (event.body.toLowerCase().startsWith("help")) {
      const args = event.body.split(" ").slice(1);
      await this.sendHelp(message, args);
    }
  },

  sendHelp: async function (message, args) {
    if (args.length === 0) {
      // সব কমান্ডের লিস্ট দেখানোর অংশ
      const categories = {};
      let msg = "╭───────❁\n│𝗘𝗿𝗲𝗻 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧\n╰─────────❁";

      for (const [name, value] of commands) {
        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────✰『  ${category.toUpperCase()}  』`;

          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 2) {
            const cmds = names.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✰`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n\n ▬▬▬▬▬▬▬▬▬▬▬▬ 📌 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: [${totalCommands}].\n ▬▬▬▬▬▬▬▬▬▬▬▬▬ \n\n`;
      msg += `\n╔════════════╗\n   𝗘𝗿𝗲𝗻 𝗬𝗲𝗮𝗴𝗲𝗿  \n╚════════════╝`;

      const helpListImages = ["https://i.imgur.com/llH9EIj.mp4"];
      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      // নির্দিষ্ট কমান্ডের তথ্য দেখানোর অংশ
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`❌ Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
        const longDescription = configCommand.longDescription?.en || "No description";
        const usage = configCommand.guide?.en.replace(/{pn}/g, commandName) || "No guide available.";

        const response = `
🔹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱: ${configCommand.name}
____
📌 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${longDescription}
____
🆔 𝗔𝗹𝗶𝗮𝘀𝗲𝘀: ${configCommand.aliases || "None"}
____
📎 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configCommand.version || "1.0"}
____
👤 𝗥𝗼𝗹𝗲: ${roleText}
____
⏳ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: ${configCommand.countDown || "0"} seconds
____
👨‍💻 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
____
📖 𝗨𝘀𝗮𝗴𝗲: ${usage}
____
⚠️ 𝗡𝗼𝘁𝗲: why bby 🥵.
____`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "🌎 𝗔𝗹𝗹 𝗨𝘀𝗲𝗿𝘀";
    case 1:
      return "👑 𝗚𝗿𝗼𝘂𝗽 𝗔𝗱𝗺𝗶𝗻𝘀";
    case 2:
      return "🤖 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻";
    default:
      return "❓ 𝗨𝗻𝗸𝗻𝗼𝘄𝗻 𝗥𝗼𝗹𝗲";
  }
}
