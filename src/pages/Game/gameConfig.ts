import { IGame, IHouse } from "./gameInterface";

export enum GameStatus {
  ONGOING = "ongoing",
  END = "end",
}

export enum EventConfig {
  KEYCARD_4S_ANNOUNCEMENT_ROUND = 10,
  KEYCARD_3S_ANNOUNCEMENT_ROUND = 7,
  KEYCARD_2S_ANNOUNCEMENT_ROUND = 4,
  RAINY_DAY = 1,
}

export enum ViralConfig {
  INFECT_SKILLPOINT = 2,
  TURN_SKILLPOINT = 1,
  ACIDREFLUX_COST = 3,
  AGILITY_COST = 3,
  TANK_COST = 3,
  MINDSEYE_COST = 3,
  PATHFINDER_COST = 3,
  ONSLAUGHT_COST = 3,
  APEX_COST = 3,
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
      pathfinder: false,
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
