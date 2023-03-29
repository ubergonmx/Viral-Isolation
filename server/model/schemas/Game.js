const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  // must be unique and 4 exact characters
  code: { type: String, required: true, unique: true, index: true, minLength: 4, maxLength: 4 },
  connectedUser: { type: String },
  status: { type: String, enum: ["waiting", "ongoing", "end"] },
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
      power: { type: Boolean, default: false },
      ranged: { type: Boolean, default: false },
      toxic: { type: Boolean, default: false },
      agility: { type: Boolean, default: false },
      tank: { type: Boolean, default: false },
      leaping: { type: Boolean, default: false },
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
      hp: { type: Number, default: 5 },
      hasEscaped: { type: Boolean, default: false },
      isDead: { type: Boolean, default: false },
      isInfected: { type: Boolean, default: false },
      numOfCures: { type: Number, default: 0 },
      numOfEvents: { type: Number, default: 0 },
      roundsAlive: { type: Number, default: 0 },
      numOfRoundsUninfected: { type: Number, default: 0 },
      straightRoundsUninfected: { type: Number, default: 0 },
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
