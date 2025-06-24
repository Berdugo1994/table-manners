"use client";

import styles from "./board.module.css";
import Players from "./players";

export default function Board({ playersAmount }: { playersAmount: number }) {
  const board = () => <div className={styles.boardAsBackground}></div>;

  return (
    <div className={styles.boardContainer}>
      {board()}
      <Players playersAmount={playersAmount} />
    </div>
  );
}
