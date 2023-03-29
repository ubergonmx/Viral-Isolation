const Rollbar = require("rollbar");
const rollbar = new Rollbar("1be8fa92af464d6abf8f2a1160fb0577");
const Game = require("../model/schemas/Game");

const connection = {
  disconnect: function (socket, io) {
    console.log(`User ${socket.id} disconnected`);
    //remove connectedUser from game by finding socket.id then log success
    Game.findOneAndUpdate({ connectedUser: socket.id }, { connectedUser: null })
      .then((doc) => {
        if (doc) {
          console.log(`User ${socket.id} disconnected from game ${doc.code}`);
          connection.getLobbies(io);
          connection.getGames(io);
          connection.getResults(io);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });

    socket.leaveAll();
  },
  create: function (socket, data) {
    //check if game exists
    Game.findOne({ code: data.code })
      .then((doc) => {
        if (doc) {
          // return error
          socket.emit("error", { message: "Game already exists" });
        } else {
          // create game
          let game = new Game({
            code: data.code,
            connectedUser: socket.id,
            status: "waiting",
            logs: [],
            viral: {},
            survivors: [],
          });
          game.save().catch((err) => {
            if (!err.message.includes("allowed length")) rollbar.error(err);
            socket.emit("error", { message: "Error creating game" });
            console.log(err);
          });
          socket.emit("created", { code: data.code });
          console.log(`User ${socket.id} created lobby with game code ${data.code}`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  join: function (socket, io, data) {
    //check if game exists
    Game.findOne({ code: data.code })
      .then((doc) => {
        if (doc) {
          // check game status
          if (doc.status === "end") {
            socket.emit("end", { hasGameEnded: true, code: data.code });
          } else {
            let roomType = doc.status === "ongoing" ? "game" : "lobby";
            // check if connectedUser is null
            if (doc.connectedUser === null || doc.connectedUser === undefined) {
              // update connectedUser
              Game.findOneAndUpdate({ connectedUser: socket.id }).catch((err) => {
                rollbar.error(err);
                console.log(err);
              });
              socket.join(data.code);
              if (roomType === "lobby") connection.getLobbies(io);
              else {
                connection.getGames(io);
                Game.findOne({ code: data.code })
                  .then((gameConfig) => {
                    socket.emit("game-config", gameConfig);
                  })
                  .catch((err) => {
                    rollbar.error(err);
                    console.log(err);
                  });
              }
              console.log(`User ${socket.id} joined ${roomType} with game code ${data.code}`);
            } else if (doc.connectedUser === socket.id) {
              socket.join(data.code);
              if (roomType === "lobby") connection.getLobbies(io);
              else {
                connection.getGames(io);
                Game.findOne({ code: data.code })
                  .then((gameConfig) => {
                    socket.emit("game-config", gameConfig);
                  })
                  .catch((err) => {
                    rollbar.error(err);
                    console.log(err);
                  });
              }
              console.log(`User ${socket.id} joined ${roomType} with game code ${data.code}`);
            } else {
              // return error
              socket.emit("error", { message: "One connection at a time", action: "goHome" });
              console.log(`User ${socket.id} tried to join existing ${roomType} with game code ${data.code}`);
            }
          }
        } else {
          // return error
          socket.emit("error", { message: "Game does not exist", action: "goHome" });
          console.log(`User ${socket.id} tried to join nonexisting lobby/game with game code ${data.code}`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  delete: function (socket, data) {
    Game.findOneAndDelete({ code: data.code }).catch((err) => {
      rollbar.error(err);
      console.log(err);
    });
    socket.leave(data.code);
    console.log(`User ${socket.id} deleted the lobby/game with game code ${data.code}`);
  },

  getLobbies: function (io) {
    Game.find({ connectedUser: null, status: "waiting" }, "code")
      .then((doc) => {
        let lobbies = [];
        doc.forEach((game) => {
          lobbies.push(game.code);
        });
        console.log(`Requested for existing lobbies`);
        io.emit("lobbies", lobbies);
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  getGames: function (io) {
    Game.find({ connectedUser: null, status: "ongoing" }, "code")
      .then((doc) => {
        let games = [];
        doc.forEach((game) => {
          games.push(game.code);
        });

        console.log(`Requested for existing games`);
        io.emit("games", games);
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  getResults: function (io) {
    Game.find({ connectedUser: null, status: "end" }, "code")
      .then((doc) => {
        let results = [];
        doc.forEach((game) => {
          results.push(game.code);
        });

        console.log(`Requested for existing results`);
        io.emit("results", results);
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
};

module.exports = connection;
