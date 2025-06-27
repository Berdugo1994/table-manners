import { Chip } from "@heroui/react";
import styles from "./plusButton.module.css";

export default function PlusButton({
  row,
  column,
  addPlayer,
}: {
  row: number;
  column: number;
  addPlayer: () => void;
}) {
  return (
    <div
      className={styles.plusButtonContainer}
      style={{
        gridColumnStart: column,
        gridRowStart: row,
      }}
    >
      <Chip
        color="success"
        onClick={() => {
          addPlayer();
        }}
      >
        +
      </Chip>
    </div>
  );
}
