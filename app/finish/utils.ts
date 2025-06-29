import { FinalPlayer } from "../types";

export const sortPlayerResults = (players: FinalPlayer[]) => {
  const sortedPlayers = players.sort((a, b) => {
    const aRatio = a.credits / a.chips;
    const bRatio = b.credits / b.chips;
    return aRatio - bRatio;
  });
  return sortedPlayers;
};
