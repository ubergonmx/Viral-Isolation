import { IGame, IHouse, ISurvivor } from "./GameInterface";

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

// create array containing 17 houses using Array.from

interface GameConfigAction {
  type: GameConfigActionType;
  payload?: IGame;
}

export enum GameConfigActionType {
  SET_GAME_CONFIG = "SET_GAME_CONFIG",
  SET_SURVIVOR = "SET_SURVIVOR",
  GET_ITEM = "GET_ITEM",
  END_TURN = "END_TURN",
}

export const gameConfigReducer = (state: IGame, action: GameConfigAction): IGame => {
  switch (action.type) {
    case GameConfigActionType.SET_GAME_CONFIG:
      return action.payload!;
    case GameConfigActionType.SET_SURVIVOR:
      const { survivors } = state;
      const {
        name,
        image,
        keycardHouse,
        hasEscaped,
        isDead,
        isInfected,
        numOfCures,
        numOfEvents,
        roundsAlive,
        numOfRoundsUninfected,
        housesEntered,
      } = action.payload as unknown as ISurvivor;
      const survivorIndex = survivors.findIndex((survivor) => survivor.name === name);
      survivors[survivorIndex] = {
        name,
        image,
        keycardHouse,
        hasEscaped,
        isDead,
        isInfected,
        numOfCures,
        numOfEvents,
        roundsAlive,
        numOfRoundsUninfected,
        housesEntered,
      };
      return { ...state, survivors } as IGame;
    case GameConfigActionType.GET_ITEM:
      const { houses } = state;
      const { id, itemCapacity, numOfItems } = action.payload as unknown as IHouse;
      const houseIndex = houses.findIndex((house) => house.id === id);
      houses[houseIndex] = { id, itemCapacity, numOfItems };
      return { ...state, houses };
    case GameConfigActionType.END_TURN:
      const { turn, round } = state;
      let newTurn = turn + 1;
      let newRound = round;
      if (newTurn === state.turnOrder.length) {
        newTurn = 0;
        newRound = round + 1;
      }
      return { ...state, turn: newTurn, round: newRound };
    default:
      return state;
  }
};
