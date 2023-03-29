import { ChatInputCommand, Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { IridiumCommand } from "../../src/structures/IridiumCommand";

export class PingCommand extends IridiumCommand {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "ping",
            description: "Ping the bot",
            aliases: ["pong"]
        });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName("ping").setDescription("Ping bot to see if it is alive")
        );
    }

    public async messageRun(message: Message) {
        await this.runPing(message);
    }

    public async chatInputRun(interaction: ChatInputCommandInteraction) {
        await this.runPing(interaction);
    }

    public async runPing(payload: Message | ChatInputCommandInteraction) {
        const ping = await payload.reply("Pinging...");

        if (payload instanceof Message) {
            ping.edit(`Pong! Latency is ${ping.createdTimestamp - payload.createdTimestamp}ms. API Latency is ${Math.round(this.container.client.ws.ping)}ms`);
        } else if (payload instanceof ChatInputCommandInteraction) {
            payload.editReply(`Pong! Latency is ${Date.now() - payload.createdTimestamp}ms. API Latency is ${Math.round(this.container.client.ws.ping)}ms`);
        }
    }
}