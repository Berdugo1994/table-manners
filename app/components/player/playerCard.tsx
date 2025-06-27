import classNames from "classnames";

import styles from "./player.module.css";
import { Player } from "@/app/store/playerStore";
import { Card, CardBody } from "@heroui/react";

export const PlayerCard = ({
  toggleFocus,
  player,
  isFocused,
}: {
  toggleFocus: () => void;
  player: Player;
  isFocused: boolean;
}) => {
  return (
    <Card
      classNames={{
        base: classNames(styles.playerCard, {
          [styles.focused]: isFocused,
        }),
        body: styles.playerCardBody,
      }}
    >
      <CardBody>
        <div
          className={classNames(styles.playerName)}
          onClick={() => {
            toggleFocus();
          }}
        >
          {player.name || "Name" + player.id}
        </div>
        <div className={styles.playerCredits}>{player.credits}</div>
      </CardBody>
    </Card>
  );
};
