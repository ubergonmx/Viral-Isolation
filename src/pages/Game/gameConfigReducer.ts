import { ViralConfig } from "./gameConfig";
import { IGame, IHouse, ISurvivor } from "./gameInterface";

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
  VIRAL_SKILL_ACIDREFLUX = "VIRAL_SKILL_ACIDREFLUX",
  VIRAL_SKILL_AGILITY = "VIRAL_SKILL_AGILITY",
  VIRAL_SKILL_TANK = "VIRAL_SKILL_TANK",
  VIRAL_SKILL_MINDSEYE = "VIRAL_SKILL_MINDSEYE",
  VIRAL_SKILL_PATHFINDER = "VIRAL_SKILL_PATHFINDER",
  VIRAL_SKILL_ONSLAUGHT = "VIRAL_SKILL_ONSLAUGHT",
  VIRAL_SKILL_APEX = "VIRAL_SKILL_APEX",
  END_TURN = "END_TURN",
  END_GAME = "END_GAME",
}

export const gameConfigReducer = (state: IGame, action: GameConfigAction): IGame => {
  if (action.type === GameConfigActionType.SET_GAME_CONFIG) {
    return action.payload!;
  } else if (action.type === GameConfigActionType.SURVIVOR_GET_ITEM) {
    const { survivors, houses } = state;
    const { id, numOfItems } = action.payload.house as unknown as IHouse;
    const houseIndex = houses.findIndex((house: IHouse) => house.id === id);
    houses[houseIndex] = { ...houses[houseIndex], numOfItems: numOfItems > 0 ? numOfItems - 1 : numOfItems };
    const survivorIndex = survivors.findIndex((survivor: ISurvivor) => survivor.name === action.payload.survivor.name);
    survivors[survivorIndex].housesEntered.push(id);
    return { ...state, houses, survivors };
  } else if (action.type === GameConfigActionType.SURVIVOR_INFECT) {
    const { survivors, viral } = state;
    const survivorIndex = survivors.findIndex((survivor: ISurvivor) => survivor.name === action.payload.name);
    survivors[survivorIndex] = { ...survivors[survivorIndex], isInfected: true };
    return { ...state, survivors, viral: { ...viral, skillPoints: viral.skillPoints + ViralConfig.INFECT_SKILLPOINT } };
  } else if (action.type === GameConfigActionType.SURVIVOR_DIE) {
    const { survivors } = state;
    const survivorIndex = survivors.findIndex((survivor: ISurvivor) => survivor.name === action.payload.name);
    survivors[survivorIndex] = { ...survivors[survivorIndex], isDead: true };
    return { ...state, survivors };
  } else if (action.type === GameConfigActionType.SURVIVOR_CURE) {
    const { survivors } = state;
    const survivorIndex = survivors.findIndex((survivor: ISurvivor) => survivor.name === action.payload.survivorCured);
    survivors[survivorIndex] = { ...survivors[survivorIndex], isInfected: false };
    return { ...state, survivors };
  } else if (action.type === GameConfigActionType.SURVIVOR_ESCAPE) {
    const { survivors, turn } = state;
    const survivorIndex = survivors.findIndex((survivor: ISurvivor) => survivor.name === action.payload.name);
    survivors[survivorIndex] = { ...survivors[survivorIndex], hasEscaped: true };
    return { ...state, survivors, turn: turn + 1 };
  } else if (action.type === GameConfigActionType.VIRAL_SKILL_ACIDREFLUX) {
    const {
      viral,
      viral: { skill },
    } = state;
    return {
      ...state,
      viral: {
        ...viral,
        skillPoints: viral.skillPoints - ViralConfig.ACIDREFLUX_COST,
        skill: { ...skill, acidReflux: true },
      },
    };
  } else if (action.type === GameConfigActionType.VIRAL_SKILL_AGILITY) {
    const {
      viral,
      viral: { skill },
    } = state;
    return {
      ...state,
      viral: {
        ...viral,
        skillPoints: viral.skillPoints - ViralConfig.AGILITY_COST,
        skill: { ...skill, agility: true },
      },
    };
  } else if (action.type === GameConfigActionType.VIRAL_SKILL_TANK) {
    const {
      viral,
      viral: { skill },
    } = state;
    return {
      ...state,
      viral: { ...viral, skillPoints: viral.skillPoints - ViralConfig.TANK_COST, skill: { ...skill, tank: true } },
    };
  } else if (action.type === GameConfigActionType.VIRAL_SKILL_MINDSEYE) {
    const {
      viral,
      viral: { skill },
    } = state;
    return {
      ...state,
      viral: {
        ...viral,
        skillPoints: viral.skillPoints - ViralConfig.MINDSEYE_COST,
        skill: { ...skill, mindsEye: true },
      },
    };
  } else if (action.type === GameConfigActionType.VIRAL_SKILL_PATHFINDER) {
    const {
      viral,
      viral: { skill },
    } = state;
    return {
      ...state,
      viral: {
        ...viral,
        skillPoints: viral.skillPoints - ViralConfig.PATHFINDER_COST,
        skill: { ...skill, pathfinder: true },
      },
    };
  } else if (action.type === GameConfigActionType.VIRAL_SKILL_ONSLAUGHT) {
    const {
      viral,
      viral: { skill },
    } = state;
    return {
      ...state,
      viral: {
        ...viral,
        skillPoints: viral.skillPoints - ViralConfig.ONSLAUGHT_COST,
        skill: { ...skill, onslaught: true },
      },
    };
  } else if (action.type === GameConfigActionType.VIRAL_SKILL_APEX) {
    const {
      viral,
      viral: { skill },
    } = state;
    return {
      ...state,
      viral: { ...viral, skillPoints: viral.skillPoints - ViralConfig.APEX_COST, skill: { ...skill, apex: true } },
    };
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
  } else if (action.type === GameConfigActionType.END_GAME) {
    return { ...state, status: "end" };
  } 
  else {
    return state;
  }
};
