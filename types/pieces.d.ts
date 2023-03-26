import { ProviderStore } from "../src/stores/ProviderStore";

declare module "@sapphire/pieces" {
    interface StoreRegistryEntries {
        providers: ProviderStore;
    }
}