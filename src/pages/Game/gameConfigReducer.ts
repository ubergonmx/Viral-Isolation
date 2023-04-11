import { IGame, IHouse, ISurvivor, IViral } from "./GameInterface";

export const INITIAL_GAME_CONFIG: IGame = {
  status: "ongoing",
  round: 1,
  turn: 0,
  turnOrder: [],
  logs: [],
  viral: {
    name: "",
    image: "",
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
  survivors: [] as ISurvivor[],
  houses: [] as IHouse[],
};

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

export const gameConfigReducer = (state: IGame, action: GameConfigAction):IGame => {
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
