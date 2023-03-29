import { Store } from "@sapphire/framework";
import { Provider } from "../providers/Provider";

export class ProviderStore extends Store<Provider> {
    constructor() {
        super(Provider, { name: "providers" });
    }
}