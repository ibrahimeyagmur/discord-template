import { Message } from "discord.js";
import type { PrefixCommand } from "../../types";

export default {
  name: "ping",
  description: "Botun gecikme süresini gösterir",
  aliases: ["p", "latency", "gecikme"],
  usage: "ping",
  async execute(message: Message) {
    message.reply({ content: `${message.client.ws.ping}ms!` });
  },
} as PrefixCommand;
