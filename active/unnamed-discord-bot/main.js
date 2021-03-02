const Discord = require("discord.js"),
  ytdl = require("ytdl-core");

const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}! 🚀`);
  client.user.setPresence({
    activity: {
      name: "you.",
      type: "WATCHING",
      //   url: "https://twitch.tv/thatempty_space",
    },
    status: "online",
  });
});

client.on("message", (message) => {
  if (
    !message.guild ||
    message.author.bot ||
    message.content.substr(0, 2) !== "::"
  )
    return;

  const messageArray = message.content.split(" ");

  switch (messageArray[0]) {
    case "::youtube":
    case "::yt":
      if (message.member.voice.channel) {
        message.member.voice.channel
          .join()
          .then((connection) => {
            connection.play(
              ytdl(messageArray[1], {
                filter: "audioonly",
              })
            );
            message.react("👍");
          })
          .catch((error) => {
            console.error(error);
            message.react("👎");
          });
      } else {
        message.reply("You need to join a voice channel first!");
        message.react("👎");
      }
      break;
    case "::leave":
    case "::l":
      if (message.guild.me.voice.channel) {
        message.guild.me.voice.channel.leave();
        message.react("👍");
      } else {
        message.reply("I'm not in a voice channel...");
        message.react("🤔");
      }
      break;
    default:
      message.reply("Command not found, what's going on!?");
      message.react("😖");
      break;
  }
});
