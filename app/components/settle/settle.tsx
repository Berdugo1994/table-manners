import { FinalPlayer } from "@/app/types";
import { getSettleTransactions } from "./utils";
import styles from "./styles.module.css";
import { Card, CardBody } from "@heroui/react";
import classNames from "classnames";

export const Settle = ({ players }: { players: FinalPlayer[] }) => {
  const settleTransactions = getSettleTransactions(players);
  return (
    <div className={styles.settleContainer}>
      {settleTransactions.map((transaction) => (
        <Card key={transaction.from + transaction.to} className="w-full">
          <CardBody>
            <div className={styles.transactionContainer}>
              <span className={classNames(styles.playerName, "text-md")}>
                {transaction.from}
              </span>
              <div className={styles.arrowContainer}>
                <span className={styles.amount}>{transaction.amount}</span>
                <i className="pi pi-arrow-right" />
              </div>
              <span className={classNames(styles.playerName, "text-md")}>
                {transaction.to}
              </span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
