import { BoardSize } from "@/app/consts/size";

export const getPlayerCellStyle = (playerColumn: number, playerRow: number) => {
  const start =
    playerColumn -
    (playerColumn === 2
      ? 0
      : playerColumn === 20
      ? BoardSize.PLAYER_CELL_WIDTH - 1
      : 1);
  const end = start + BoardSize.PLAYER_CELL_WIDTH;
  return {
    gridColumnStart: start,
    gridColumnEnd: end,
    gridRowStart: playerRow,
  };
};
