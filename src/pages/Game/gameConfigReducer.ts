import { ViralConfig } from "./gameConfig";
import { IGame, IHouse } from "./gameInterface";

interface GameConfigAction {
  type: GameConfigActionType;
  payload?: any;
}

export enum GameConfigActionType {
  SET_GAME_CONFIG = "SET_GAME_CONFIG",
  SURVIVOR_GET_ITEM = "GET_ITEM",
  SURVIVOR_INFECT = "SURVIVOR_INFECT",
  SURVIVOR_CURE = "SURVIVOR_CURE",
  SURVIVOR_ESCAPE = "SURVIVOR_ESCAPE",
  SURVIVOR_DIE = "SURVIVOR_DIE",
  END_TURN = "END_TURN",
}

export const gameConfigReducer = (state: IGame, action: GameConfigAction): IGame => {
  if (action.type === GameConfigActionType.SET_GAME_CONFIG) {
    return action.payload!;
  } else if (action.type === GameConfigActionType.SURVIVOR_GET_ITEM) {
    const { survivors, houses } = state;
    const { id, numOfItems } = action.payload.house as unknown as IHouse;
    const houseIndex = houses.findIndex((house) => house.id === id);
    houses[houseIndex] = { ...houses[houseIndex], numOfItems: numOfItems > 0 ? numOfItems - 1 : numOfItems };
    const survivorIndex = survivors.findIndex((survivor) => survivor.name === action.payload.survivor.name);
    survivors[survivorIndex].housesEntered.push(id);
    return { ...state, houses, survivors };
  } else if (action.type === GameConfigActionType.SURVIVOR_INFECT) {
    const { survivors, viral } = state;
    const survivorIndex = survivors.findIndex((survivor) => survivor.name === action.payload.name);
    survivors[survivorIndex] = { ...survivors[survivorIndex], isInfected: true };
    return { ...state, survivors, viral: { ...viral, skillPoints: viral.skillPoints + ViralConfig.INFECT_SKILLPOINT } };
  } else if (action.type === GameConfigActionType.SURVIVOR_CURE) {
    const { survivors } = state;
    const survivorIndex = survivors.findIndex((survivor) => survivor.name === action.payload.name);
    survivors[survivorIndex] = { ...survivors[survivorIndex], isInfected: false };
    return { ...state, survivors };
  } else if (action.type === GameConfigActionType.SURVIVOR_ESCAPE) {
    const { survivors, turn } = state;
    const survivorIndex = survivors.findIndex((survivor) => survivor.name === action.payload.name);
    survivors[survivorIndex] = { ...survivors[survivorIndex], hasEscaped: true };
    return { ...state, survivors, turn: turn + 1 };
  } else if (action.type === GameConfigActionType.SURVIVOR_DIE) {
    const { survivors, turn } = state;
    const survivorIndex = survivors.findIndex((survivor) => survivor.name === action.payload.name);
    survivors[survivorIndex] = { ...survivors[survivorIndex], isDead: true };
    return { ...state, survivors, turn: turn + 1 };
  } else if (action.type === GameConfigActionType.END_TURN) {
    const { turnOrder, turn, round, viral } = state;
    let newTurn = turn + 1;
    let newRound = round;
    if (newTurn === turnOrder.length) {
      newTurn = 0;
      newRound = round + 1;
    }
    if (turnOrder[newTurn] === viral.name)
      return {
        ...state,
        turn: newTurn,
        round: newRound,
        viral: { ...viral, skillPoints: viral.skillPoints + ViralConfig.TURN_SKILLPOINT },
      };
    return { ...state, turn: newTurn, round: newRound };
  } else {
    return state;
  }
};
