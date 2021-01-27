export default class ReactRoles {
  constructor(opts) {
    this.opts = opts;
    this.rolesArray = (() => {
      let rolesArray = {};
      for (const [category, roles] of Object.entries(opts.roles)) {
        for (const [emoji, roleId] of Object.entries(roles)) {
          rolesArray[emoji] = roleId;
        }
      }
      return rolesArray;
    })();
  }

  setup(message) {
    for (const [category, roles] of Object.entries(this.opts.roles)) {
      let roleMessage = `**${category}**`,
        roleReactions = [];
      for (const [key2, value2] of Object.entries(roles)) {
        roleMessage += `\n ${key2} = ${
          message.guild.roles.resolve(value2).name
        }`;
        roleReactions.push(key2);
      }
      message.channel.send(roleMessage).then((message) =>
        roleReactions.forEach((element) => {
          message.react(element);
        })
      );
    }
  }

  action(messageReaction, user, operation) {
    let roles = messageReaction.message.guild.members.resolve(user.id).roles;
    if (operation === "add") {
      roles.add(this.rolesArray[messageReaction.emoji]);
    } else if (operation === "remove") {
      roles.remove(this.rolesArray[messageReaction.emoji]);
    }
  }
}
