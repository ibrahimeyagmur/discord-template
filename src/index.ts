import { BotClient } from "./structures/Client";
import config from "./config";

const client = new BotClient();

async function start() {
  try {
    await client.loadCommands();
    await client.loadEvents();

    await client.login(config.token);
  } catch (error) {
    console.error("Bot başlatılırken hata:", error);
    process.exit(1);
  }
}

start();
