import { FinalPlayer } from "@/app/types";
import styles from "./styles.module.css";
import { getPnlString } from "@/app/utils/finish";
import { Chip } from "@heroui/react";

export const Podium = ({ players }: { players: FinalPlayer[] }) => {
  const topWinners = players.slice(0, 3);
  const first = topWinners[0];
  const second = topWinners[1];
  const third = topWinners[2];

  return (
    <div className={styles.podiumContainer}>
      {second && (
        <div className={`${styles.podiumSpot} ${styles.second}`}>
          <div className={styles.podiumRank}>2</div>
          <div className={styles.podiumPnl}>{getPnlString(second.pnl)}</div>
          <Chip color="default" size="sm" variant="flat">
            {second.name}
          </Chip>
        </div>
      )}
      {first && (
        <div className={`${styles.podiumSpot} ${styles.first}`}>
          <div className={styles.podiumRank}>1</div>
          <div className={styles.podiumPnl}>{getPnlString(first.pnl)}</div>
          <Chip color="default" size="sm" variant="flat" className="mt-2">
            {first.name}
          </Chip>
        </div>
      )}
      {third && (
        <div className={`${styles.podiumSpot} ${styles.third}`}>
          <div className={styles.podiumRank}>3</div>
          <div className={styles.podiumPnl}>{getPnlString(third.pnl)}</div>
          <Chip color="default" size="sm" variant="flat" className="mt-2">
            {third.name}
          </Chip>
        </div>
      )}
    </div>
  );
};

export default Podium;
