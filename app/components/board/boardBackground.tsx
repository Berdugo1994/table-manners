import styles from "./board.module.css";
import { BoardMiddle } from "./boardMiddle";

export default function BoardBackground() {
  return (
    <div id="board-background-id" className={styles.boardAsBackground}>
      <BoardMiddle />
    </div>
  );
}
