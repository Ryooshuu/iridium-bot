import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";

export class Iridium extends SapphireClient {

    constructor(options: SapphireClientOptions & { intents: number | number[] }) {
        super(options);

        this.login(process.env.IRIDIUM_BOT_TOKEN);
    }
}
