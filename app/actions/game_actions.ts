"use server";
import { addGame, getGameById, getNextGameId } from "@/app/api/game_db_utils";
import { Player } from "@/app/store/playerStore";
import { DbPlayer } from "@/lib/model/player";
import { FinalPlayer } from "../types";
import { transformPlayersToDbPlayers } from "./game_utils";

export async function finishGame(
  players: Player[],
  playersChips: number[]
): Promise<number | null> {
  if (!players || players.length === 0) {
    return null;
  }
  const nextGameId = await getNextGameId();
  const playersToAdd: DbPlayer[] = transformPlayersToDbPlayers(
    players,
    playersChips
  );
  const res = await addGame(playersToAdd, nextGameId);
  if (res.acknowledged) {
    return nextGameId;
  } else {
    return null;
  }
}
export async function getGame(gameId: number): Promise<FinalPlayer[] | null> {
  const game = await getGameById(gameId);
  if (game) {
    return game.players.map((player) => ({
      name: player.name,
      credits: player.credits,
      chips: player.chips,
      pnl: player.pnl,
      isWinner: player.isWinner,
    }));
  } else {
    return null;
  }
}
