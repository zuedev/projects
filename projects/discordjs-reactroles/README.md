![](./socialImage.png)

# discordjs-reactroles

## Example

```js
import Discord from "discord.js";
import ReactRoles from "discordjs-reactroles";

const client = new Discord.Client();

const reactRoles = new ReactRoles({
  roles: {
    Notifications: {
      "🕹️": "726701850136674304",
      "🎬": "726702217486270486",
    },
    Colours: {
      "🟥": "726696772231233617",
      "🟦": "726696805932466196",
    },
  },
});

client.on("messageReactionAdd", (messageReaction, user) => {
  if (!user.bot) reactRoles.action(messageReaction, user, "add");
});

client.on("messageReactionRemove", (messageReaction, user) => {
  if (!user.bot) reactRoles.action(messageReaction, user, "remove");
});

client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.content === ".roleSelection") {
    reactRoles.setup(message);
    return;
  }
});

client.login(process.env.TOKEN);
```
