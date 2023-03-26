import { ChatInputCommand, Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class PingCommand extends Command {
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
        const ping = await message.channel.send("Pinging...");
        ping.edit(`Pong! Latency is ${ping.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(this.container.client.ws.ping)}ms`);
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.reply("Pinging...");
        interaction.editReply(`Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(this.container.client.ws.ping)}ms`);
    }
}