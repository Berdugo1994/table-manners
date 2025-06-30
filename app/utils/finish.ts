export const getPnlString = (pnl: number) => {
  if (pnl > 0) {
    return `+${pnl}`;
  }
  return pnl;
};
