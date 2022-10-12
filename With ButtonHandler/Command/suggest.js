const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const SuggestDB = require("../../Schemas/SuggestDB");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest something.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Whats the type of your suggestion.")
        .setRequired(true)
        .addChoices(
          { name: "Command", value: "command" },
          { name: "Event", value: "event" },
          { name: "System", value: "System" },
          { name: "Other", value: "other" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("suggestion")
        .setDescription("Name your suggestion.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Describe your suggestion.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { guild, options, member } = interaction;

    const name = options.getString("suggestion");
    const description = options.getString("description");
    const type = options.getString("type");

    const embed = new EmbedBuilder()
      .setColor("Navy")
      .setAuthor({
        name: `${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      })
      .addFields(
        {
          name: "<:info:1029480432821075988> | New Suggestion",
          value: `${name} ` + `:\n \`${description}\``,
          inline: false,
        },
        { name: "Type", value: `${type}`, inline: true },
        { name: "Status", value: "Pending", inline: true }
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("suggest-accept")
        .setEmoji(`<:info:1029480432821075988>`)
        .setStyle(ButtonStyle.Success)
        .setLabel("Accept"),
      new ButtonBuilder()
        .setCustomId("suggest-decline")
        .setEmoji(`<:wrong_1:1027194257192255488>`)
        .setStyle(ButtonStyle.Danger)
        .setLabel("Decline")
    );
    interaction.reply({
      content: `:white_check_mark: | Your suggestion has been succesfully submitted in our [server](https://discord.com/channels/1020560054128226346/1025747095216455770).`,
      ephemeral: true,
    });
    try {
      const msg = await client.channels.cache
        .get("1025747095216455770")
        .send({ embeds: [embed], components: [row] });
      await SuggestDB.create({
        Guild: guild.id,
        Message: msg.id,
        Details: [
          {
            MemberID: interaction.user.id,
            Type: type,
            Suggestion: name,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
