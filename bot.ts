import { config } from "dotenv";
config();

import { Iridium } from "./src/Iridium";
import { GatewayIntentBits  } from "discord.js";

new Iridium({
    intents: [GatewayIntentBits.MessageContent],
    loadMessageCommandListeners: true,
    defaultPrefix: process.env.IRIDIUM_PREFIX,
});