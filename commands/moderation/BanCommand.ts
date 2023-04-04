import { Args, ChatInputCommand, Command } from "@sapphire/framework";
import { Guild, Message, User } from "discord.js";
import { IridiumCommand } from "../../src/structures/IridiumCommand";

export class BanCommand extends IridiumCommand {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "ban",
            description: "Ban a user"
        });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) => {
            builder.setName("ban")
                .setDescription("Ban a user")
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
            const user = await args.pick("user");
            const reason = await args.pick("string").catch(() => undefined);

            await message.guild?.members.ban(user, { reason });
            await message.reply(`${user.username} has been banned off of the server successfully.`);
        } catch {
            await message.reply("Unable to ban user. Does the bot have any permissions to do so?");
        }
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason", false);

        if (!user)
            return await interaction.reply("The user you are trying to ban does not exist in the server.");

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (await this.banUser(interaction.guild!, user, reason ?? undefined))
            return await interaction.reply(`${user.username} has been banned off of the server successfully.`);

        return await interaction.reply("Unable to ban user. Does the bot have any permissions to do so?");
    }

    private async banUser(guild: Guild, user: User, reason?: string): Promise<boolean> {
        try {
            await guild.members.ban(user, { reason });
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}