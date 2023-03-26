import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { getRootData } from "@sapphire/pieces";
import { join } from "path";
import { ProviderStore } from "./stores/ProviderStore";

export class Iridium extends SapphireClient {
    private rootData = getRootData();

    constructor(options: SapphireClientOptions & { intents: number | number[] }) {
        super(options);

        this.stores
            .register(new ProviderStore().registerPath(join(this.rootData.root, "providers")));

        this.login(process.env.IRIDIUM_BOT_TOKEN);
    }
}
