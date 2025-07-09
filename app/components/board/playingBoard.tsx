"use client";

import styles from "./board.module.css";
import Players from "../player/players";
import Settings from "../settings/settings";
import BoardBackground from "./boardBackground";
import { useEffect, useState } from "react";
import { useBoardStore } from "@/app/store/boardStore";
import { getGameById } from "@/app/api/game_db_utils";
import { Spinner, ToastProvider } from "@heroui/react";
import { usePlayerStore } from "@/app/store/playerStore";
import AddPlayersModal from "../addPlayersModal/addPlayertsModal";

export default function PlayingBoard({ gameId }: { gameId: number }) {
  const BoardStore = useBoardStore();
  const PlayerStore = usePlayerStore();
  const [hasBoardData, setHasBoardData] = useState(
    BoardStore.isBoardInitialized()
  );
  const [shouldAddPlayer, setShouldAddPlayer] = useState<boolean | null>(null);

  useEffect(() => {
    if (!hasBoardData) {
      if (!gameId) {
        console.error("No gameId and no board data");
        return;
      }
      getGameById(gameId).then((game) => {
        if (game) {
          BoardStore.initBoard(
            game.gameSerialNumber,
            game.gameName,
            game.ratio,
            game.buyIn
          );

          if (game.players.length === 0) {
            setShouldAddPlayer(true);
          }

          game.players.forEach((player) => {
            PlayerStore.createPlayer(player.credits, player.name);
          });

          setHasBoardData(true);
        }
      });
    }
    if (
      hasBoardData &&
      shouldAddPlayer === null &&
      PlayerStore.getPlayersAmount() === 0
    ) {
      setShouldAddPlayer(true);
    }
  }, [hasBoardData, gameId, BoardStore, PlayerStore, shouldAddPlayer]);

  return (
    <div className={styles.boardContainer}>
      <ToastProvider placement={"bottom-left"} />
      <BoardBackground />
      {hasBoardData && (
        <>
          <Players />
          <Settings gameId={gameId} />
        </>
      )}
      {shouldAddPlayer && (
        <div className="">
          <AddPlayersModal onClose={() => setShouldAddPlayer(false)} />
        </div>
      )}
      {!hasBoardData && (
        <div className={styles.loadingCenter}>
          <Spinner color="white" />
        </div>
      )}
    </div>
  );
}
