const Rollbar = require("rollbar");
const rollbar = new Rollbar("1be8fa92af464d6abf8f2a1160fb0577");
const Game = require("../model/schemas/Game");

const game = {
  start: function (socket, io, data) {
    console.log(data);
    const { code, turnOrder, viral, survivors, houses } = data;
    Game.findOneAndUpdate(
      { code: code },
      {
        $set: {
          "viral.name": viral.name,
          "viral.image": viral.image,
          survivors: survivors,
          houses: houses,
          turnOrder: turnOrder,
          status: "ongoing",
        },
      },
    )
      .then((doc) => {
        if (doc) {
          console.log(`User ${socket.id} started the game with game code ${data.code}`);
          io.to(data.code).emit("started", { ...data, code: data.code });
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  getSurvivorItem: function (socket, data) {
    const { code, survivor, houseId } = data;
    //add houseId to survivor's housesEntered
    Game.findOneAndUpdate(
      { code: code, "survivors.name": survivor.name },
      { $push: { "survivors.$.housesEntered": houseId } },
    )
      .then((doc) => {
        if (doc) {
          console.log(`[U-${socket.id}] ${survivor.name} entered to H${houseId}`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
    //decrease numOfItems in house
    Game.findOneAndUpdate({ code: code, "houses.id": houseId }, { $inc: { "houses.$.numOfItems": -1 } })
      .then((doc) => {
        if (doc) {
          console.log(`[U-${socket.id}] ${survivor.name} got an item from H${houseId}`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  // TODO: fix this function - apply -1 hp if infected
  endTurn: function (socket, data) {
    const { code, turn, round } = data;
    Game.findOneAndUpdate({ code: code }, { $set: { turn: turn, round: round } })
      .then((doc) => {
        if (doc) {
          console.log(`[U-${socket.id}] ${doc.turnOrder[turn]}'s turn ended`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  nextTurn: function (socket, data) {
    const { code, turn, round } = data;
    Game.findOneAndUpdate({ code: code }, { $set: { turn: turn, round: round } })
      .then((doc) => {
        if (doc) {
          console.log(`[U-${socket.id}] ${doc.turnOrder[turn]}'s turn`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
};

module.exports = game;
