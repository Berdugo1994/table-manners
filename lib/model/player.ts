import { ObjectId } from "mongodb";

export type DbPlayer = {
  _id?: ObjectId;
  name: string;
  credits: number;
  chips: number;
  pnl: number;
  isWinner: boolean;
  checkoutChips: number;
  isCheckedOut: boolean;
};
