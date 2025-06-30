"use client";

import styles from "./board.module.css";
import Players from "../player/players";
import Settings from "../settings/settings";
import { useState } from "react";
import { WelcomeModal } from "../welcomeModal/welcomeModal";
import { useBoardStore } from "@/app/store/boardStore";
import { BoardMiddle } from "./boardMiddle";

export default function Board() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { initBoard } = useBoardStore();

  const Board = () => (
    <div id="board-background-id" className={styles.boardAsBackground}>
      <BoardMiddle />
    </div>
  );

  const onSubmit = (gameName: string, ratio: number, buyIn: number) => {
    setIsModalOpen(false);
    initBoard(gameName, ratio, buyIn);
  };

  return (
    <div className={styles.boardContainer}>
      <Board />
      <Players />
      <Settings />
      <WelcomeModal isModalOpen={isModalOpen} onSubmit={onSubmit} />
    </div>
  );
}
