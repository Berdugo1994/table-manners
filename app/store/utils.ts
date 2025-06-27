import { Player } from "./playerStore";
import { getPlayerLocation } from "../components/board/locations";

export const reOrderPlayers = (
  players: Player[],
  firstPlayerIdOnEdge: number,
  secondPlayerIdOnEdge: number
) => {
  return players.map((player, index) => {
    if ([firstPlayerIdOnEdge, secondPlayerIdOnEdge].includes(player.id)) {
      const location = getPlayerLocation(index, players.length);
      return {
        ...player,
        rowIndex: location.row,
        columnIndex: location.column,
      };
    }
    return player;
  });
};
