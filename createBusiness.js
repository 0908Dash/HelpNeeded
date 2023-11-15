const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const config = require('../../config.json');

const createBusinessCommand = new SlashCommandBuilder()
    .setName('create-business')
    .setDescription("Creates the business's channels and roles")
    .addStringOption((option) => 
        option
            .setName('business-name')
            .setDescription("Sets the business's name")
            .setRequired(true))
    .addStringOption((option) => 
        option
            .setName('topic')
            .setDescription('Sets the topic of the channel')
            .setRequired(false));

async function handleCreateBusinessCommand(interaction) {
    const devIds = config.devIds;
    const userID = interaction.user.id;
    const serverOwnerID = interaction.guild.ownerId;
    const isDeveloper = devIds.includes(userID);
    const isAdmin = interaction.member.permissions.has('ADMINISTRATOR');
    const isOwner = userID === serverOwnerID;
    const categoryId = '1173691852835274792';
    const logChannel = config.logChannel;

    if (isAdmin || isDeveloper || isOwner) {
        try {
            const businessName = interaction.options.getString('business-name');
            const topic = interaction.options.getString('topic');
            let category = interaction.guild.channels.cache.get(categoryId);
            const user = interaction.user.username;
            const { ViewChannel, ReadMessageHistory, SendMessages, Connect, Speak } = PermissionFlagsBits;

            if (!category) {
                // If the category doesn't exist, create it
                await interaction.reply("The category does not exist. I will now create the category...");
                
                category = await interaction.guild.channels.create({
                    name: '🟩🟨 Business Channels 🟩🟨',
                    type: ChannelType.GUILD_CATEGORY
                });

                await interaction.editReply("Category created ");
            }
            
            // Step 1: Create a role with the provided name and set its color to #00ff00
            const role = await interaction.guild.roles.create({
                name: businessName,
                color: '#00ff00'
            });

            // Get the role ID
            const roleID = role.id;

            // Step 2: Create channels with the provided name
            const textChannel = await interaction.guild.channels.create(`${businessName}`, {
                type: ChannelType.GUILD_TEXT,
                topic: topic,
                parent: category,

                permissionOverwrites: [
                    {
                        id: roleID,
                        allow: [ ViewChannel, ReadMessageHistory, SendMessages ]
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [ ViewChannel, ReadMessageHistory, SendMessages ]
                    }
                ]
            });

            const voiceChannel = await interaction.guild.channels.create(`${businessName}`, {
                type: ChannelType.GUILD_VOICE,
                parent: category,

                permissionOverwrites: [
                    {
                        id: roleID,
                        allow: [ ViewChannel, Connect, Speak ]
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [ ViewChannel, Connect, Speak ]
                    }
                ]
            });

            // Get channel links
            const textChannelLink = textChannel.toString();
            const voiceChannelLink = voiceChannel.toString();
            

            // Step 3: Send a confirmation message
            await interaction.reply(`Business channels and role for "${businessName}" have been created!`);

            const logEmbed = {
                color: 0x014421,
                title: "Business Created",
                fields: [
                    {
                        "name": `Business Name: ${businessName}`,
                    },
                    {
                        "name": `Text Channel: ${textChannelLink}` // link to the text channel
                    },
                    {
                        "name": `Voice Channel: ${voiceChannelLink}` // link to the voice channel
                    },
                    {
                        "name": `Role: ${roleID}`
                    }
                ],
                footer: `${user} approved this business.`
            };

            const channel = await client.channels.fetch(logChannel);
            channel.send({ embeds: [logEmbed] });
        } catch (error) {
            console.error(error);
            // Handle the error appropriately, e.g., log it or send an error message
            await interaction.reply("An error occurred while processing the command.");
        }
    } else {
        // If the user doesn't have sufficient permissions, send an error message
        await interaction.reply("You don't have permission to use this command.");
    }
}

module.exports = {
    data: createBusinessCommand,
    execute: handleCreateBusinessCommand
};
