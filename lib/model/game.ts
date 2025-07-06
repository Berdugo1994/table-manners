import { ObjectId } from "mongodb";
import { DbPlayer } from "./player";

export enum GameState {
  Playing = "playing",
  Finished = "finished",
}

export type DbGame = {
  _id: ObjectId;
  players: Array<DbPlayer>;
  gameSerialNumber: number;
  state: GameState;
  startDate: Date;
  lastUpdate: Date;
  buyIn: number;
  ratio: number;
  gameName: string;
};

export type DbGameToAdd = Omit<DbGame, "_id">;
