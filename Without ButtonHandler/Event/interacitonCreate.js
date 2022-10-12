const {
  ButtonInteraction,
  EmbedBuilder,
  PermissionsBitField,
  Colors,
} = require("discord.js");
const SuggestDB = require("../../Schemas/SuggestDB");
module.exports = {
  name: "interactionCreate",
  /**
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return interaction.reply({content: "You dont have ADMINISTRATOR permission to use this",ephemeral: true});

    const { guild, customId, message } = interaction;
    SuggestDB.findOne({ Guild: guild.id, Message: message.id },async (err, data) => {
        if (err) throw err;
        if (!data)
          return interaction.reply({content: "No Data was found in the database",ephemeral: true,});
        const Embed = EmbedBuilder.from(message.embeds[0]);
        if (!Embed) return;
        switch (customId) {
          case "suggest-accept":
            {
              Embed.spliceFields(2, 2, {name: "Status",value: "Accepted",inline: true,});
               message.edit({embeds: [Embed.setColor(Colors.Green)]});
              interaction.reply({content: "Suggestion Accepted",ephemeral: true});
            }

            break;

          case "suggest-decline":
            {
              Embed.spliceFields(2, 2, {name: "Status",value: "Declined",inline: true,});
                message.edit({embeds: [Embed.setColor(Colors.Red)]});
              interaction.reply({content: "Suggestion Declined",ephemeral: true});
            }

            break;
        }
      }
    );
  },
};
