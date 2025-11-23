import { BotClient } from "../structures/Client";
import { Events, ChatInputCommandInteraction } from "discord.js";

export default {
  name: Events.InteractionCreate,
  execute(client: BotClient, interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);

    if (!command) {
      interaction
        .reply({ content: "Bu komut bulunamadı!", ephemeral: true })
        .catch(console.error);
      return;
    }

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(
        `${interaction.commandName} komutu çalıştırılırken hata:`,
        error
      );
      interaction
        .reply({
          content: "Komut çalıştırılırken bir hata oluştu!",
          ephemeral: true,
        })
        .catch(console.error);
    }
  },
};
