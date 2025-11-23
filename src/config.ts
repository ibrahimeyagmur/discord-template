import { config } from "dotenv";

config();

export default {
  token: process.env.TOKEN || "",
  prefix: process.env.PREFIX || "!",
  clientId: process.env.CLIENT_ID || "",
  guildId: process.env.GUILD_ID || "",
};
