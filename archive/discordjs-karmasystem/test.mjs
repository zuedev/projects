import Discord from "discord.js";
import KarmaSystem from "./index.mjs";

const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION"],
});

const karmaSystem = new KarmaSystem({
  points: {
    "726549067206754304": 2, // superlike
    "726549331997491331": 1, //updoot
    "726549313291026454": -1, //downdoot
    "726549078917251073": -2, //superdislike
  },
  logging: true, // spits out karma diff to console
});

client.on("message", (message) => {
  if (message.author.bot) return;

  switch (message.content) {
    case ".karma":
      message.reply(
        `your karma is: ${karmaSystem.getKarma(message.author.id)}`
      );
      break;
    case ".karmalist":
      let karmaList = karmaSystem.getKarmaList();
      let toSend = "";
      karmaList.slice(0, 5).forEach((element) => {
        toSend +=
          "**" +
          message.guild.member(element.user).user.tag +
          "** " +
          "`" +
          element.points +
          "`\n";
      });
      message.channel.send(toSend);
      break;
  }
});

client.on("messageReactionAdd", async (messageReaction, user) => {
  if (messageReaction.message.partial) await messageReaction.message.fetch();
  if (messageReaction.partial) await messageReaction.fetch();

  if (!user.bot && user.id !== messageReaction.message.author.id)
    karmaSystem.action(messageReaction, user, "add");
});

client.on("messageReactionRemove", async (messageReaction, user) => {
  if (messageReaction.message.partial) await messageReaction.message.fetch();
  if (messageReaction.partial) await messageReaction.fetch();

  if (!user.bot && user.id !== messageReaction.message.author.id)
    karmaSystem.action(messageReaction, user, "remove");
});

client.login(process.env.TOKEN);
