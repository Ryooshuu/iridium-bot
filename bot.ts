import { config } from "dotenv";
config();

import { Iridium } from "./src/Iridium";
import { GatewayIntentBits  } from "discord.js";

new Iridium({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    loadMessageCommandListeners: true,
    defaultPrefix: process.env.IRIDIUM_PREFIX,
});