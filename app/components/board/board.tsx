"use client";

import styles from "./board.module.css";
import Players from "../player/players";
import Settings from "../settings/settings";

export default function Board() {
  const board = () => (
    <div id="board-background-id" className={styles.boardAsBackground}></div>
  );

  return (
    <div className={styles.boardContainer}>
      {board()}
      <Players />
      <Settings />
    </div>
  );
}
