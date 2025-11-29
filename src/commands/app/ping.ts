import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import type { SlashCommand } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("gecikme")
    .setDescription("Botun gecikme süresini gösterir."),

  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({ content: `${interaction.client.ws.ping}ms!` });
  },
} as SlashCommand;
