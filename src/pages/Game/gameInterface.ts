export interface IPlayer {
  name: string;
  image: string;
  role: "Viral" | "Survivor";
}
export interface ISurvivor {
  name: string;
  image: string;
  keycardHouse: number;
  hasEscaped: boolean;
  isDead: boolean;
  isInfected: boolean;
  numOfCures: number;
  numOfEvents: number;
  roundsAlive: number;
  numOfRoundsUninfected: number;
  housesEntered: number[];
}
export interface IViral {
  name: string;
  image: string;
  skillPoints: number;
  skill: {
    acidReflux: boolean;
    agility: boolean;
    tank: boolean;
    mindsEye: boolean;
    leaping: boolean;
    onslaught: boolean;
    apex: boolean;
  };
  numOfInfections: number;
  numOfKillings: number;
  numOfEvents: number;
}

export interface IHouse {
  id: number;
  itemCapacity: number;
  numOfItems: number;
}
export interface IGame {
  status: "waiting" | "ongoing" | "end";
  round: number;
  turn: number;
  turnOrder: string[];
  logs?: {
    type: "action" | "event";
    action: string;
    event: string;
  }[];
  viral: IViral;
  survivors: ISurvivor[];
  houses: IHouse[];
}
