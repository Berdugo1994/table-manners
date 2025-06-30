"use server";
import { DbGame } from "@/lib/model/game";
import { DbPlayer } from "@/lib/model/player";
import clientPromise from "@/lib/mongodb";
import { Db, ObjectId } from "mongodb";

let db: Db | null = null;
//DB Models
export async function mongoDbClient() {
  if (!db) {
    db = await clientPromise.then((client) => client.db(process.env.DB_NAME));
  }
}

// ---- Add ----
export async function addGame(
  players: Array<DbPlayer>,
  gameSerialNumber: number
): Promise<{ acknowledged: boolean; insertedId: ObjectId | null }> {
  await mongoDbClient();
  if (!db) return { acknowledged: false, insertedId: null };
  const gamesCollection = db.collection("games");
  const dbRes = await gamesCollection.insertOne({
    players,
    gameSerialNumber,
  });
  return dbRes;
}

export async function getNextGameId(): Promise<number> {
  await mongoDbClient();
  if (!db) return 0;
  const gamesCollection = db.collection("games");
  const count = await gamesCollection.countDocuments({});
  return count + 1;
}

export async function getGameById(gameId: number): Promise<DbGame | null> {
  await mongoDbClient();
  if (!db) return null;
  const gamesCollection = db.collection("games");
  const game = await gamesCollection.findOne<DbGame>({
    gameSerialNumber: gameId,
  });
  return game;
}
