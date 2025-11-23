import { Client, GatewayIntentBits, Collection } from "discord.js";
import { PrefixCommand, SlashCommand } from "../types";
import config from "../config";
import { readdirSync } from "fs";
import { join } from "path";

export class BotClient extends Client {
  public prefixCommands: Collection<string, PrefixCommand> = new Collection();
  public slashCommands: Collection<string, SlashCommand> = new Collection();
  public prefix: string = config.prefix;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }

  public async loadCommands() {
    const commandPath = join(__dirname, "../commands/command");
    const commandFiles = readdirSync(commandPath).filter(
      (file) => file.endsWith(".ts") || file.endsWith(".js")
    );

    for (const file of commandFiles) {
      const command: PrefixCommand = require(join(commandPath, file)).default;
      if (command.name) {
        this.prefixCommands.set(command.name, command);
        if (command.aliases) {
          command.aliases.forEach((alias) => {
            this.prefixCommands.set(alias, command);
          });
        }
        console.log(`✓ Prefix komut yüklendi: ${command.name}`);
      }
    }

    const slashPath = join(__dirname, "../commands/app");
    const slashFiles = readdirSync(slashPath).filter(
      (file) => file.endsWith(".ts") || file.endsWith(".js")
    );

    for (const file of slashFiles) {
      const command: SlashCommand = require(join(slashPath, file)).default;
      if (command.data) {
        this.slashCommands.set(command.data.name, command);
        console.log(`✓ Slash komut yüklendi: ${command.data.name}`);
      }
    }
  }

  public async loadEvents() {
    const eventPath = join(__dirname, "../events");
    const eventFiles = readdirSync(eventPath).filter(
      (file) => file.endsWith(".ts") || file.endsWith(".js")
    );

    for (const file of eventFiles) {
      const event = require(join(eventPath, file)).default;
      if (event.once) {
        this.once(event.name, (...args) => event.execute(this, ...args));
      } else {
        this.on(event.name, (...args) => event.execute(this, ...args));
      }
      console.log(`✓ Event yüklendi: ${event.name}`);
    }
  }

  public async registerSlashCommands() {
    const commands = this.slashCommands.map((cmd) => cmd.data.toJSON());

    try {
      if (config.guildId) {
        const guild = this.guilds.cache.get(config.guildId);
        if (guild) {
          await guild.commands.set(commands);
          console.log(`✓ ${commands.length} slash komut guild'e kaydedildi`);
        }
      } else {
        await this.application?.commands.set(commands);
        console.log(
          `✓ ${commands.length} slash komut global olarak kaydedildi`
        );
      }
    } catch (error) {
      console.error("Slash komutlar kaydedilirken hata:", error);
    }
  }
}
