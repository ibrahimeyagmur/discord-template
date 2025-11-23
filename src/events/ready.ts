import { BotClient } from "../structures/Client";
import { Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: BotClient) {
    console.log(`✓ ${client.user?.tag} olarak giriş yapıldı!`);
    console.log(`✓ ${client.prefixCommands.size} prefix komut yüklendi`);
    console.log(`✓ ${client.slashCommands.size} slash komut yüklendi`);

    client.user?.setActivity("https://instagram.com/ibrahim.e.yagmur ", {
      type: 0,
    });

    client.registerSlashCommands();
  },
};
