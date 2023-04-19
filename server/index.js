require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const Rollbar = require("rollbar");
const rollbar = new Rollbar("1be8fa92af464d6abf8f2a1160fb0577");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

// Socket.io controllers
const connection = require("./controller/connectionController");
const game = require("./controller/gameController");
const items = require("./items"); // obsolete

const db = require("./model/db");

const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(rollbar.errorHandler());

const server = http.createServer(app);
// add more origins to the array if you want to allow more than one frontend
const io = new Server(server, {
  cors: {
    origin: [
      "http://127.0.0.1:8080",
      "http://127.0.0.1:5137",
      "https://admin.socket.io",
      "https://viral-isolation.pages.dev/",
    ], // change this to your frontend url
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Main socket events
  socket.on("disconnect", () => connection.disconnect(socket, io));
  socket.on("create", (data) => connection.create(socket, data));
  socket.on("join", (data) => connection.join(socket, io, data));
  socket.on("delete", (data) => connection.delete(socket, data));

  // Get lobbies, games, and results - io.emit
  socket.on("get-lobbies", () => connection.getLobbies(io));
  socket.on("get-games", () => connection.getGames(io));
  socket.on("get-results", () => connection.getResults(io));

  // Game events
  socket.on("start", (data) => game.start(socket, io, data));
  socket.on("get-survivor-item", (data) => game.getSurvivorItem(socket, data));
  socket.on("end-turn", (data) => game.endTurn(socket, data));
  socket.on("next-turn", (data) => game.nextTurn(socket, data));
  socket.on("survivor-infect", (data) => game.infectSurvivor(socket, data));
  socket.on("survivor-cure", (data) => game.cureSurvivor(socket, data));
  socket.on("survivor-escape", (data) => game.escapeSurvivor(socket, data));
  socket.on("survivor-kill", (data) => game.killSurvivor(socket, data));
  socket.on("viral-skill", (data) => game.viralSkill(socket, data));


  // Results events
  socket.on("get-results", () => game.getResults(io));

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
  console.log(`Server is running on port ${port} (${process.env.PORT})`);
});

instrument(io, { auth: false });
