import { FinalPlayer } from "../types";

export const sortPlayerResults = (players: FinalPlayer[]) => {
  const sortedPlayers = players.sort((a, b) => {
    return b.pnl - a.pnl;
  });
  return sortedPlayers;
};
