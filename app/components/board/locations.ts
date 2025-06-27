export const getPlayerLocation = (
  playerIndex: number,
  playersAmount: number
): { row: number; column: number } => {
  if (playerIndex < 0) {
    throw new Error("Player index cannot be negative");
  }
  if (playerIndex >= playersAmount) {
    throw new Error("Player index cannot be greater than players amount");
  }
  const maxPlayerOnTable = playersAmount <= 4 ? 4 : 8;
  switch (maxPlayerOnTable) {
    case 4:
      if (playerIndex === 0) {
        return { row: 1, column: 3 };
      } else if (playerIndex === 1) {
        return { row: 3, column: 5 };
      } else if (playerIndex === 2) {
        return { row: 5, column: 3 };
      } else if (playerIndex === 3) {
        return { row: 3, column: 1 };
      }
      throw new Error("Player index out of bounds");

    case 8:
      if (playerIndex === 0) {
        return { row: 1, column: 2 };
      } else if (playerIndex === 1) {
        return { row: 2, column: 5 };
      } else if (playerIndex === 2) {
        return { row: 5, column: 4 };
      } else if (playerIndex === 3) {
        return { row: 4, column: 1 };
      } else if (playerIndex === 4) {
        return { row: 1, column: 4 };
      } else if (playerIndex === 5) {
        return { row: 4, column: 5 };
      } else if (playerIndex === 6) {
        return { row: 5, column: 2 };
      } else if (playerIndex === 7) {
        return { row: 2, column: 1 };
      }
      throw new Error("Player index out of bounds");
    default:
      throw new Error("Invalid number of players");
  }
};
