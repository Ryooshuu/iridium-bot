import { Args, ChatInputCommand, Command } from "@sapphire/framework";
import { Guild, Message, User } from "discord.js";

export class KickCommand extends Command {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "kick",
            description: "Kick a user",
            aliases: ["boot"]
        });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) => {
            builder.setName("kick")
                .setDescription("Kick a user")
                .addUserOption(b => b.setRequired(true)
                    .setName("user")
                    .setDescription("The user you want to ban")
                )
                .addStringOption(b =>
                    b.setRequired(false)
                        .setName("reason")
                        .setDescription("The reason you're banning this user")
                );
        });
    }

    public async messageRun(message: Message, args: Args) {
        try {
            let user = await args.pick("user");
            let reason = await args.pick("string").catch(() => undefined);

            await message.guild!.members.kick(user, reason);

            let content = `${user.username} has been kicked off of the server successfully.`;
            if (reason) {
                content += ` The reason given was: ${reason}`;
            }

            await message.reply(content);
        } catch {
            await message.reply("Unable to kick user. Does the bot have any permissions to do so?");
        }
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        let user = interaction.options.getUser("user");
        let reason = interaction.options.getString("reason", false);

        if (!user) {
            await interaction.reply("The user you are trying to kick does not exist in the server.");
            return;
        }

        if (await this.kickUser(interaction.guild!, user)) {
            let message = `${user.username} has been kicked off of the server successfully.`;
            if (reason) {
                message += ` The reason given was: ${reason}`;
            }

            await interaction.reply(message);
            return;
        }

        await interaction.reply("Unable to kick user. Does the bot have any permissions to do so?");
    }

    private async kickUser(guild: Guild, user: User): Promise<boolean> {
        try {
            await guild.members.kick(user);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}