import { FinalPlayer } from "@/app/types";
import { SettleTransaction } from "./types";
const maxIterations = 5;

export const getSettleTransactions = (
  sortedPlayers: FinalPlayer[]
): SettleTransaction[] => {
  const settleTransactions: SettleTransaction[] = [];
  let playersBalance = sortedPlayers.map((player) => ({
    name: player.name,
    balance: player.pnl,
  }));
  for (let i = 0; i < maxIterations; i++) {
    playersBalance = playersBalance
      .filter((player) => player.balance != 0)
      .toSorted((a, b) => b.balance - a.balance);
    let lp = 0;
    let rp = playersBalance.length - 1;
    while (lp < rp && playersBalance.length > 0) {
      const leftPlayer = playersBalance[lp]; // Player with the highest balance
      const rightPlayer = playersBalance[rp]; // Player with the lowest balance
      if (rightPlayer.balance + leftPlayer.balance <= 0) {
        const amountToPay = leftPlayer.balance;
        settleTransactions.push({
          from: rightPlayer.name,
          to: leftPlayer.name,
          amount: amountToPay,
        });
        leftPlayer.balance = 0;
        rightPlayer.balance += amountToPay;
        lp++;
      } else {
        const amountToPay = -rightPlayer.balance;
        settleTransactions.push({
          from: rightPlayer.name,
          to: leftPlayer.name,
          amount: amountToPay,
        });
        rightPlayer.balance = 0;
        leftPlayer.balance -= amountToPay;
        rp--;
      }
    }
  }
  return settleTransactions;
};
