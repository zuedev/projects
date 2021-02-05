import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";

export default class KarmaSystem {
  constructor(opts) {
    this.opts = opts;
    if (opts.logging) this.logging = true;

    this.db = low(new FileSync("db.json"));
    this.db.defaults({ points: [] }).write();
  }

  action(messageReaction, user, operation) {
    let emojiId = messageReaction.emoji.id;
    if (operation === "add") {
      this._setPoints(
        messageReaction.message.author.id,
        this.opts.points[emojiId]
      );
    } else if (operation === "remove") {
      this._setPoints(
        messageReaction.message.author.id,
        this.opts.points[emojiId] * -1
      );
    }
  }

  getKarma(userId) {
    let userEntry = this.db.get("points").find({ user: userId }).value();
    if (!userEntry) {
      return 0;
    } else {
      return userEntry.points;
    }
  }

  getKarmaList() {
    return this.db
      .get("points")
      .value()
      .sort((a, b) => {
        let A = a.points,
          B = b.points;
        if (A > B) return -1;
        if (A < B) return 1;
        return 0;
      });
  }

  _setPoints(userId, amount) {
    if (this.logging) console.log({ [userId]: amount });
    if (isNaN(amount)) return; // amount should always be a number, otherwise it breaks
    let userEntry = this.db.get("points").find({ user: userId }).value();
    if (!userEntry) {
      this.db.get("points").push({ user: userId, points: amount }).write();
    } else {
      let newPoints = userEntry.points + amount;
      this.db
        .get("points")
        .find({ user: userId })
        .assign({ points: newPoints })
        .write();
    }
  }
}
