/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Listener } from "@sapphire/framework";
import { ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, Guild } from "discord.js";
import { Colors } from "../src/util/Constants";

interface Risk {
    severity: RiskSeverity;
    message: string;
}

enum RiskSeverity {
    Low,
    Medium,
    High
}

export class GuildCreateListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: "guildCreate"
        });
    }

    public run(guild: Guild) {
        const embed = new EmbedBuilder();

        guild.fetchOwner().then((owner) => {
            // Check risk factors
            // Get the bot to member ratio
            const botCount = guild.members.cache.filter((member) => member.user.bot).size;
            const ratio = botCount / guild.memberCount;
            const risks: Risk[] = [];

            // Get online members
            const onlineMembers = guild.members.cache.filter((member) => member.presence?.status !== "offline").size;

            // Check if the bot to member ratio is too high
            if (ratio > 0.75) {
                // Check if the amount of bots is greater than 10
                const botsVsMembers = guild.memberCount - botCount;
                if (botsVsMembers < 10) {
                    // Simply just leave the guild, we don't want to be in a server with less than 10 members and more than 75% bots.
                    guild.leave();
                    return;
                }

                // Add the risk to the risks array
                risks.push({
                    severity: RiskSeverity.High,
                    message: "Bot to member ratio is too high"
                });
            } else if (ratio >= 0.5) {
                risks.push({
                    severity: RiskSeverity.Medium,
                    message: "Bot to member ratio is quite high"
                });
            }

            let riskMessage: string;
            if (risks.length > 5 || risks.find((risk) => risk.severity === RiskSeverity.High) !== undefined || risks.filter((risk) => risk.severity === RiskSeverity.Medium).length >= risks.length / 2) {
                riskMessage = "This server has too many risks attached to it. Please review the server.";
                embed.setColor(Colors.Failure);
            } else if (risks.length > 0) {
                riskMessage = "This server has quite a few risks attached to it. Please review the server.";
                embed.setColor(Colors.Warning);
            } else {
                riskMessage = "This server has no risks attached to it.";
                embed.setColor(Colors.Success);
            }
            const riskMessageCount = risks.reduce((message, current) => {
                message += `${current.message}\n`;

                return message;
            }, "");


            embed.setTitle(`Server Added: ${guild.name}`);
            embed.setDescription(`Server ID: ${guild.id}\nServer Owner: ${owner.user.username} (${owner.id})`);
            embed.addFields(
                { name: "Member Count", value: `${guild.memberCount} (Online: ${onlineMembers})`, inline: true },
                { name: "Bot/Total Member Ratio", value: `${botCount}/${guild.memberCount} (${(ratio * 100).toFixed(2)}%)`, inline: true },
                { name: "Risk Factor", value: risks.length > 0 ? `${riskMessage}\n${riskMessageCount}` : "This server has no risks attached to it.", inline: false }  
            );
            embed.setThumbnail(guild.iconURL());

            // Get the development guild
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.container.client.guilds.fetch(process.env.IRIDIUM_DEVELOPMENT_GUILD!).then((devGuild) => {
                // Get the development guild's log channel
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                devGuild.channels.fetch(process.env.IRIDIUM_GUILD_LOG_CHANNEL!).then((logChannel) => {
                    // Send the embed
                    if (logChannel?.isTextBased()) {
                        logChannel.send({
                            embeds: [
                                embed
                            ],
                            components: [
                                {
                                    type: ComponentType.ActionRow,
                                    components: [
                                        new ButtonBuilder()
                                            .setCustomId("owner-leave-guild")
                                            .setStyle(ButtonStyle.Danger)
                                            .setLabel("Leave Guild")
                                    ]
                                }
                            ]
                        });
                    }
                });
            });
        });
    }
}