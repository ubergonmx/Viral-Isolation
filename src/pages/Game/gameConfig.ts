import { IGame, IHouse } from "./gameInterface";

export enum EventConfig {
  RAINY_DAY = 1,
}

export enum ViralConfig {
  INFECT_SKILLPOINT = 2,
  TURN_SKILLPOINT = 1,
}

export const INITIAL_GAME_CONFIG: IGame = {
  status: "ongoing",
  round: 1,
  turn: 0,
  turnOrder: ["Survivor 1", "Survivor 2", "Viral"],
  logs: [],
  viral: {
    name: "Viral",
    image: "/pieces/viral-1.png",
    skillPoints: 0,
    skill: {
      acidReflux: false,
      agility: false,
      tank: false,
      mindsEye: false,
      leaping: false,
      onslaught: false,
      apex: false,
    },
    numOfInfections: 0,
    numOfKillings: 0,
    numOfEvents: 0,
  },
  survivors: [
    {
      name: "Survivor 1",
      image: "/pieces/survivor-1.png",
      keycardHouse: 0,
      hasEscaped: false,
      isDead: false,
      isInfected: false,
      numOfCures: 0,
      numOfEvents: 0,
      roundsAlive: 0,
      numOfRoundsUninfected: 0,
      housesEntered: [],
    },
    {
      name: "Survivor 2",
      image: "/pieces/survivor-2.png",
      keycardHouse: 0,
      hasEscaped: false,
      isDead: false,
      isInfected: false,
      numOfCures: 0,
      numOfEvents: 0,
      roundsAlive: 0,
      numOfRoundsUninfected: 0,
      housesEntered: [],
    },
  ],
  houses: Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    itemCapacity: 0,
    numOfItems: 0,
  })) as IHouse[],
};
