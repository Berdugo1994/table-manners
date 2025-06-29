import { Player } from "../store/playerStore";
import { DbPlayer } from "@/lib/model/player";

export const transformPlayersToDbPlayers = (
  players: Player[],
  playersChips: number[]
): DbPlayer[] => {
  const sumCredits = players.reduce((acc, player) => acc + player.credits, 0); // 80
  const sumChips = playersChips.reduce((acc, chips) => acc + chips, 0); // 40
  const ratio = sumCredits / sumChips; // 2
  const pnlPerPlayer = players.map((player, index) =>
    Math.round(playersChips[index] * ratio - player.credits)
  );
  const winnerId = players.findIndex(
    (player) => player.credits === Math.max(...pnlPerPlayer)
  );
  return players.map((player, index) => ({
    ...player,
    pnl: pnlPerPlayer[index],
    chips: playersChips[index],
    isWinner: index === winnerId,
  }));
};
