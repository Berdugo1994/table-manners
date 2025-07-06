"use server";
import { DbGame, DbGameToAdd, GameState } from "@/lib/model/game";
import clientPromise from "@/lib/mongodb";
import { Db } from "mongodb";
import { BoardMetadata } from "../types/load";

let db: Db | null = null;
//DB Models
export async function mongoDbClient() {
  if (!db) {
    db = await clientPromise.then((client) => client.db(process.env.DB_NAME));
  }
}

// ---- Add ----
export async function addGame(
  gameName: string,
  buyIn: number,
  ratio: number
): Promise<{ acknowledged: boolean; gameSerialNumber: number | null }> {
  await mongoDbClient();
  if (!db) return { acknowledged: false, gameSerialNumber: null };
  const gameSerialNumber = await getNextGameId();
  const gamesCollection = db.collection<DbGameToAdd>("games");
  const dbRes = await gamesCollection.insertOne({
    players: [],
    gameSerialNumber,
    state: GameState.Playing,
    startDate: new Date(),
    lastUpdate: new Date(),
    buyIn,
    ratio,
    gameName,
  });
  if (!dbRes.acknowledged)
    return { acknowledged: false, gameSerialNumber: null };
  return { acknowledged: true, gameSerialNumber };
}

export async function updateGame(
  gameId: number,
  updatedGameFields: Partial<DbGame>
): Promise<boolean> {
  await mongoDbClient();
  if (!db) return false;
  const gamesCollection = db.collection<DbGameToAdd>("games");
  const gameToUpdate = await gamesCollection.findOne<DbGame>({
    gameSerialNumber: gameId,
  });
  if (!gameToUpdate) return false;
  const updatedGame = { ...gameToUpdate, ...updatedGameFields };
  const res = await gamesCollection.updateOne(
    { gameSerialNumber: gameId },
    { $set: updatedGame }
  );
  return res.acknowledged;
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

/**
 * get board id, name, and state
 * @param boardIds
 * @returns
 */

export async function getBoardsMetadata(
  boardIds: number[]
): Promise<BoardMetadata[]> {
  await mongoDbClient();
  if (!db) return [];
  const gamesCollection = db.collection("games");
  const projection = {
    _id: 0,
    gameSerialNumber: 1,
    gameName: 1,
    state: 1,
  } as const;

  //Not sorted by gameSerialNumber
  const resultFromDb: BoardMetadata[] = await gamesCollection
    .find({
      gameSerialNumber: { $in: boardIds },
    })
    .project<BoardMetadata>(projection)
    .toArray();
  const finalResult: BoardMetadata[] = [];
  boardIds.forEach((id) => {
    const game = resultFromDb.find((game) => game.gameSerialNumber === id);
    if (game) {
      finalResult.push(game);
    }
  });
  return finalResult;
}
