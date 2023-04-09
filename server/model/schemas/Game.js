const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  // must be unique and 4 exact characters
  code: { type: String, required: true, unique: true, index: true, minLength: 4, maxLength: 4 },
  connectedUser: { type: String },
  status: { type: String, enum: ["waiting", "ongoing", "end"] },
  round: { type: Number, default: 1 },
  turn: { type: Number, default: 0 },
  turnOrder: [String],
  logs: [
    {
      type: { type: String, enum: ["action", "event"] },
      action: String,
      event: String,
    },
  ],
  viral: {
    name: String,
    image: String,
    skillPoints: { type: Number, default: 0 },
    skill: {
      acidReflux: { type: Boolean, default: false },
      agility: { type: Boolean, default: false },
      tank: { type: Boolean, default: false },
      mindsEye: { type: Boolean, default: false },
      leaping: { type: Boolean, default: false },
      onslaught: { type: Boolean, default: false },
      apex: { type: Boolean, default: false },
    },
    numOfInfections: { type: Number, default: 0 },
    numOfKillings: { type: Number, default: 0 },
    numOfEvents: { type: Number, default: 0 },
  },
  survivors: [
    {
      name: String,
      image: String,
      keycardHouse: Number,
      hasEscaped: { type: Boolean, default: false },
      isDead: { type: Boolean, default: false },
      isInfected: { type: Boolean, default: false },
      numOfCures: { type: Number, default: 0 },
      numOfEvents: { type: Number, default: 0 },
      roundsAlive: { type: Number, default: 0 },
      numOfRoundsUninfected: { type: Number, default: 0 },
      housesEntered: [Number],
    },
  ],
  houses: [
    {
      id: Number,
      itemCapacity: Number,
      numOfItems: Number,
    },
  ],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
