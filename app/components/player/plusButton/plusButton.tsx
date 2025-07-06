import { Chip } from "@heroui/react";
import styles from "./plusButton.module.css";
import { getPlayerCellStyle } from "../utils";

export default function PlusButton({
  row,
  column,
  addPlayer,
}: {
  row: number;
  column: number;
  addPlayer: () => void;
}) {
  const { gridColumnStart, gridColumnEnd, gridRowStart } = getPlayerCellStyle(
    column,
    row
  );
  return (
    <div
      className={styles.plusButtonContainer}
      style={{
        gridColumnStart,
        gridColumnEnd,
        gridRowStart,
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
