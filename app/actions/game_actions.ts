"use server";
import {
  getBoardsMetadata,
  getGameById,
  updateGame,
} from "@/app/api/game_db_utils";
import { Player } from "@/app/store/playerStore";
import { DbPlayer } from "@/lib/model/player";
import { FinalPlayer } from "../types";
import {
  transformFinishedPlayers,
  transformPlayingPlayers,
} from "./game_utils";
import { GameState } from "@/lib/model/game";
import { BoardMetadata } from "../types/load";

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

export async function updateWhileGameIsRunning(
  gameId: number | null,
  players: Player[]
) {
  if (!gameId) {
    console.error("Game ID is null - could not update players");
    return false;
  }
  const updatedPlayers: DbPlayer[] = transformPlayingPlayers(players);
  const res = await updateGame(gameId, {
    players: updatedPlayers,
  });
  if (res) {
    return true;
  } else {
    return false;
  }
}

/**
 * Finishes the game and updates the database
 * @param players - the players of the game
 * @param playersChips - the chips of the players
 * @param gameId - the id of the game
 * @returns boolean if the game was finished successfully and updated in the database
 */
export async function finishGame(
  gameId: number,
  players: Player[],
  playersChips: number[]
): Promise<boolean> {
  if (!players || players.length === 0) {
    return false;
  }
  const playersToAdd: DbPlayer[] = transformFinishedPlayers(
    players,
    playersChips
  );
  const res = await updateGame(gameId, {
    players: playersToAdd,
    state: GameState.Finished,
    lastUpdate: new Date(),
  });
  if (res) {
    return true;
  } else {
    return false;
  }
}

export async function getRecentBoardsMetadata(
  recentBoardsIds: number[]
): Promise<BoardMetadata[]> {
  return await getBoardsMetadata(recentBoardsIds);
}
