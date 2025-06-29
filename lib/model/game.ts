import { ObjectId } from "mongodb";
import { DbPlayer } from "./player";

export type DbGame = {
  _id: ObjectId;
  players: Array<DbPlayer>;
  gameSerialNumber: number;
};
