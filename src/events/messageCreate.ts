import { BotClient } from "../structures/Client";
import { Events, Message } from "discord.js";

export default {
  name: Events.MessageCreate,
  execute(client: BotClient, message: Message) {
    if (message.author.bot) return;

    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(`${commandName} komutu çalıştırılırken hata:`, error);
      message
        .reply("Komut çalıştırılırken bir hata oluştu!")
        .catch(console.error);
    }
  },
};
