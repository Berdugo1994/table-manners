import { GameState } from "@/lib/model/game";

export enum RequestType {
  GET_RECENT_BOARDS = "get_recent_boards",
}

export type BoardMetadata = {
  gameSerialNumber: number;
  gameName: string;
  state: GameState;
};
