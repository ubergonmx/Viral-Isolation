require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const Rollbar = require("rollbar");
const rollbar = new Rollbar("1be8fa92af464d6abf8f2a1160fb0577");

const items = require("./items");
const db = require("./model/db");
const Game = require("./model/schemas/Game");

const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(rollbar.errorHandler());

const server = http.createServer(app);
// add more origins to the array if you want to allow more than one frontend
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:8080", "http://127.0.0.1:5137", "https://viral-isolation.pages.dev/"], // change this to your frontend url
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("disconnect", () => {
    //remove connectedUser from game by finding socket.id then log success 
    Game.findOneAndUpdate({ connectedUser: socket.id }, { connectedUser: null })
      .then((doc) => {
        if (doc) {
          console.log(`User ${socket.id} disconnected from game ${doc.code}`);
        }
      })
      .catch((err) => {
      rollbar.error(err);
      console.log(err);
    });
    
    socket.leaveAll();
  });

  socket.on("create", (data) => {
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
            socket.emit("error", { message : "Error creating game" });
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
  });

  socket.on("join", (data) => {
    //check if game exists
    Game.findOne({code: data.code})
      .then((doc) => {
        if (doc) {
          // check game status
          if (doc.status === "end") {
            socket.emit("end", { hasGameEnded: true, code: data.code });
          } else {
            // check if connectedUser is null
            if (doc.connectedUser === null || doc.connectedUser === undefined) {
              // update connectedUser
              Game.findOneAndUpdate({ connectedUser: socket.id }).catch((err) => {
                rollbar.error(err);
                console.log(err);
              });
              socket.join(data.code);
              console.log(`User ${socket.id} joined lobby with game code ${data.code}`);
            }
            else if (doc.connectedUser === socket.id) {
              socket.join(data.code);
              console.log(`User ${socket.id} joined lobby with game code ${data.code}`);
            }
            else {
              // return error
              socket.emit("error", { message: "Game master does not match", action: "goHome" });
              console.log(`User ${socket.id} tried to join existing lobby with game code ${data.code}`);
            }
          }
        } else {
          // return error
          socket.emit("error", { message: "Game does not exist", action: "goHome" });
          console.log(`User ${socket.id} tried to join nonexisting lobby with game code ${data.code}`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  });
  
  socket.on("delete", (data) => {
    Game.findOneAndDelete({code: data.code})
    .catch((err) => {
      rollbar.error(err);
      console.log(err);
    });
    socket.leave(data.code);
    console.log(`User ${socket.id} deleted the lobby with game code ${data.code}`);
  });

  socket.on("get-lobbies", function () {
    Game.find({connectedUser: null, status:"waiting"}, "code")
    .then((doc) => {
      let lobbies = [];
      doc.forEach((game) => {
        lobbies.push(game.code);
      });

      console.log(`User ${socket.id} requested for existing lobbies`);
      console.log(lobbies);
      socket.emit("lobbies", lobbies);
    })
    .catch((err) => {
      rollbar.error(err);
      console.log(err);
    });
  });

  //get-games
  socket.on("get-games", function () {
    Game.find({connectedUser: null, status: "ongoing"}, "code")
    .then((doc) => {
      let games = [];
      doc.forEach((game) => {
        games.push(game.code);
      });

      console.log(`User ${socket.id} requested for existing games`);
      console.log(games);
      socket.emit("games", games);
    })
    .catch((err) => {
      rollbar.error(err);
      console.log(err);
    });
  });

  //get-results
  socket.on("get-results", function () {
    Game.find({connectedUser: null, status: "end"}, "code")
    .then((doc) => {
      let results = [];
      doc.forEach((game) => {
        results.push(game.code);
      });

      console.log(`User ${socket.id} requested for existing results`);
      console.log(results);
      socket.emit("results", results);
    })
    .catch((err) => {
      rollbar.error(err);
      console.log(err);
    });
  });

  // obsolete
  socket.on("getItem", (data) => {
    socket.broadcast.to(data.room).emit("useItem", data);
    console.log(`User ${socket.id} entered House ${data} and got an item!`);
    let random = Math.floor(Math.random() * 44) + 1;
    io.emit("receiveItem", data, items.scatteredItems[random]);
  });
});

app.get(["/", "/:name"], (req, res) => {
  greeting = "<h1>Hello from Node on Fly!</h1>";
  let name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});

db.connectDB();

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
