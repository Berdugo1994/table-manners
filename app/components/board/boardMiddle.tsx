import { useBoardStore } from "@/app/store/boardStore";
import styles from "./board.module.css";
import { Chips, Credit } from "../icons/credit";
import { usePlayerStore } from "@/app/store/playerStore";
import { Divider } from "@heroui/react";

export const BoardMiddle = () => {
  const { getGameName, getRatio } = useBoardStore();
  const { getAllCredits } = usePlayerStore();

  return (
    <div className={styles.boardMiddle}>
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
    </div>
  );
};
