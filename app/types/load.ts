import { GameState } from "@/lib/model/game";

export enum RequestType {
  GET_RECENT_BOARDS = "get_recent_boards",
}

export type BoardMetadata = {
  gameSerialNumber: number;
  gameName: string;
  state: GameState;
};

export type SerializedGame = {
  gameSerialNumber: number;
  gameName: string;
  ratio: number;
  buyIn: number;
  players: SerializedPlayer[];
};

export type SerializedPlayer = {
  name: string;
  credits: number;
  checkoutChips: number;
  isCheckedOut: boolean;
};
