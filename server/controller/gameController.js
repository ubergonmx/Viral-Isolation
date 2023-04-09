const Rollbar = require("rollbar");
const rollbar = new Rollbar("1be8fa92af464d6abf8f2a1160fb0577");
const Game = require("../model/schemas/Game");

const config = {
  numOfHouses: 17,
  numOfSurvivors: 4,
  totalItemCapacity: 50,
};

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCapacityNum(pool) {
  let randomNum = Math.floor(Math.random() * pool.numOfSurvivors) + 1;
  const capacity = Math.min(randomNum, pool.totalItemCapacity);
  pool.totalItemCapacity -= capacity;
  return capacity;
}

function generateHouses(config) {
  const houses = [];
  for (let i = 0; i < config.numOfHouses; i++) {
    let num = getRandomCapacityNum(config);
    houses.push({
      id: i + 1,
      itemCapacity: num,
      numOfItems: num,
    });
  }

  while (config.totalItemCapacity > 0) {
    const randomHouse = Math.floor(Math.random() * houses.length);
    if (houses[randomHouse].itemCapacity < 4) {
      houses[randomHouse].itemCapacity += 1;
      houses[randomHouse].numOfItems += 1;
      config.totalItemCapacity -= 1;
    }
  }

  return houses;
}

const game = {
  start: function (socket, io, data) {
    // console.log(data);
    const { code, turnOrder, viral, survivors } = data;
    const gameConfig = {
      "viral.name": viral.name,
      "viral.image": viral.image,
      survivors: survivors.map((survivor) => {
        return {
          name: survivor.name,
          image: survivor.image,
          keycardHouse: generateRandomNumber(1, config.numOfHouses),
        };
      }),
      houses: generateHouses(config),
      turnOrder: turnOrder,
      status: "ongoing",
    };
    console.log(gameConfig);
    Game.findOneAndUpdate(
      { code: code },
      {
        $set: gameConfig,
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
  infectSurvivor: function (socket, data) {
    const { code, survivor } = data;
    Game.findOneAndUpdate({ code: code, "survivors.name": survivor.name }, { $set: { "survivors.$.isInfected": true } })
      .then((doc) => {
        if (doc) {
          console.log(`[U-${socket.id}] ${survivor.name} is infected`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  cureSurvivor: function (socket, data) {
    const { code, survivor } = data;
    Game.findOneAndUpdate(
      { code: code, "survivors.name": survivor.name },
      { $set: { "survivors.$.isInfected": false } },
    )
      .then((doc) => {
        if (doc) {
          console.log(`[U-${socket.id}] ${survivor.name} is cured`);
        }
      })
      .catch((err) => {
        rollbar.error(err);
        console.log(err);
      });
  },
  // TODO:
  // [ ] increase roundsAlive for survivor
  // [ ] if survivor is not infected, increment numOfRoundsUninfected
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
  // TODO: add a check if the survivor is already dead
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
  getResults: function (socket, data) {},
};

module.exports = game;
