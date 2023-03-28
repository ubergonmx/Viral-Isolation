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
    skillPoints: Number,
    skill: {
      power: Boolean,
      ranged: Boolean,
      toxic: Boolean,
      agility: Boolean,
      tank: Boolean,
      leaping: Boolean,
      apex: Boolean,
    },
    numOfInfections: Number,
    numOfKillings: Number,
    numOfEvents: Number,
  },
  survivors: [
    {
      name: String,
      hp: Number,
      hasEscaped: Boolean,
      isDead: Boolean,
      isInfected: Boolean,
      numOfCures: Number,
      numOfEvents: Number,
      roundsAlive: Number,
      numOfRoundsUninfected: Number,
      straightRoundsUninfected: Number,
      housesEntered: [Number],
    },
  ],
  houses: [
    {
      id: Number,
      itemCapacity: Number,
      numOfItems: Number,
    }
  ]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
