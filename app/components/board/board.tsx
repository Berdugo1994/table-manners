"use client";

import styles from "./board.module.css";
import Players from "../player/players";

export default function Board() {
  const board = () => <div className={styles.boardAsBackground}></div>;

  return (
    <div className={styles.boardContainer}>
      {board()}
      <Players />
    </div>
  );
}
