import { Chip } from "@heroui/react";
import styles from "./plusButton.module.css";
import { getPlayerCellStyle } from "../utils";
import { CiCircleRemove } from "react-icons/ci";

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

export const CustomPlusButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.plusButtonContainer}>
      <Chip color="success" onClick={onClick}>
        +
      </Chip>
    </div>
  );
};

export const CustomMinusButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.minusButtonContainer}>
      <Chip color="danger" onClick={onClick}>
        -
      </Chip>
    </div>
  );
};

export const CustomRemoveButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.removeButtonContainer}>
      {/* <Chip variant="bordered" color="danger" onClick={onClick}> */}
      <CiCircleRemove size={28} onClick={onClick} />
      {/* </Chip> */}
    </div>
  );
};
