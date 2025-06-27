import { Player } from "./playerStore";
import { getPlayerLocation } from "../components/board/locations";

export const reOrderPlayers = (players: Player[]) => {
  return players.map((player, index) => {
    const location = getPlayerLocation(index, players.length);
    return {
      ...player,
      rowIndex: location.row,
      columnIndex: location.column,
    };
  });
};
