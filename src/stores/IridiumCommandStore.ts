import { CommandStore } from "@sapphire/framework";
import { IridiumCommand } from "../structures/IridiumCommand";

export class IridiumCommandStore extends CommandStore {
    constructor() {
        super();
    }

    public override async loadAll() {
        await super.loadAll();

        for (const command of this.values()) {
            if (command instanceof IridiumCommand) {
                // Set the command's module based off of base category if one isn't present
                if (!command.module) {
                    command.module = command.category;
                }
            }
        }

        console.log(this.values());

    }
}