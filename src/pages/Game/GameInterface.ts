export interface ISurvivor {
  name: string;
  image: string;
  hp: number;
  hasEscaped: boolean;
  isDead: boolean;
  isInfected: boolean;
  numOfCures: number;
  numOfEvents: number;
  roundsAlive: number;
  numOfRoundsUninfected: number;
  straightRoundsUninfected: number;
  housesEntered: number[];
}
export interface IViral {
  name: string;
  image: string;
  skillPoints: number;
  skill: {
    power: boolean;
    ranged: boolean;
    toxic: boolean;
    agility: boolean;
    tank: boolean;
    leaping: boolean;
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
