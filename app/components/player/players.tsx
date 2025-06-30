import { useState } from "react";
import { getPlayerLocation } from "../board/locations";
import Player from "./player";
import { usePlayerStore } from "../../store/playerStore";
import PlusButton from "./plusButton/plusButton";

export default function Players() {
  const [focusedPlayerId, setFocusedPlayerId] = useState<number | null>(null);
  const { addPlayer, getPlayersAmount, getPlayersIds, nextPlayerId } =
    usePlayerStore();
  const playersAmount = getPlayersAmount();

  const getPlusButtonLocation = () => {
    const location = getPlayerLocation(playersAmount, playersAmount + 1);
    return {
      row: location.row,
      column: location.column,
    };
  };

  const renderPlayers = () => {
    const playersIds = getPlayersIds();
    return playersIds.map((playerId) => {
      return (
        <Player
          key={playerId}
          playerId={playerId}
          isFocused={focusedPlayerId === playerId}
          toggleFocus={() => {
            setFocusedPlayerId(focusedPlayerId === playerId ? null : playerId);
          }}
        />
      );
    });
  };

  const renderPlusButton = () => {
    if (focusedPlayerId !== null || playersAmount >= 8) return null;
    const location = getPlusButtonLocation();
    const createdPlayerId = nextPlayerId();
    return (
      <PlusButton
        row={location.row}
        column={location.column}
        addPlayer={() => {
          addPlayer();
          setFocusedPlayerId(createdPlayerId);
        }}
      />
    );
  };

  //Release focus when clicking outside of the board
  document?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("#board-background-id")) {
      setFocusedPlayerId(null);
    }
  });

  return (
    <>
      {renderPlayers()}
      {renderPlusButton()}
    </>
  );
}
