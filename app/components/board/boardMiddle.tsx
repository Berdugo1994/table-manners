import { useBoardStore } from "@/app/store/boardStore";
import styles from "./board.module.css";
import { Chips, Credit } from "../icons/credit";
import { usePlayerStore } from "@/app/store/playerStore";
import { Divider } from "@heroui/react";
import { useState } from "react";

export const BoardMiddle = () => {
  const { getGameName, getRatio } = useBoardStore();
  const { getAllCredits } = usePlayerStore();
  const [clickTimestamps, setClickTimestamps] = useState<number[]>([]);
  const checkForDoubleClick = () => {
    const now = Date.now();
    const twoSecondsAgo = now - 2000;
    const newTimestamps = [...clickTimestamps, now].filter(
      (timestamp) => timestamp > twoSecondsAgo
    );
    setClickTimestamps(newTimestamps);
    if (newTimestamps.length > 5) {
      setTimeout(() => {
        setClickTimestamps([]);
      }, 10000);
    }
  };

  return (
    <div className={styles.boardMiddle} onClick={checkForDoubleClick}>
      <div className={styles.boardMiddleText}>
        <div className={styles.boardMiddleTextTitle}>{getGameName()}</div>
      </div>
      <div className={styles.creditsAndChips}>
        <div className="flex items-center ">
          <Credit />
          <div className="mt-1">{getAllCredits()}</div>
        </div>
        <Divider orientation="vertical" className="h-full bg-white mt-" />
        <div className="flex items-center">
          <div className="mt-1">{getAllCredits() * (getRatio() ?? 0)}</div>
          <Chips />
        </div>
      </div>
      {clickTimestamps.length > 5 && (
        <div className="text-white">Bona Yamanyak!</div>
      )}
    </div>
  );
};
