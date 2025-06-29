import classNames from "classnames";

import styles from "./player.module.css";
import { Player } from "@/app/store/playerStore";
import { Avatar, Badge } from "@heroui/react";

const calcPlayerName = (player: Player): string => {
  const name = player.name;
  const [firstName, lastName] = name.split(" ");
  return lastName
    ? (firstName[0] + lastName[0]).toUpperCase()
    : firstName.slice(0, 2).toLocaleUpperCase();
};

export const PlayerCard = ({
  player,
  isFocused,
  onPlayerClick,
}: {
  player: Player;
  isFocused: boolean;
  onPlayerClick: () => void;
}) => {
  return (
    <div
      className={classNames(styles.playerCard, {
        [styles.focused]: isFocused,
      })}
      onClick={onPlayerClick}
    >
      <Badge color="primary" content={player.credits}>
        <Avatar
          showFallback
          name={calcPlayerName(player)}
          isBordered={isFocused}
          color={isFocused ? "success" : "default"}
          size={isFocused ? "lg" : "md"}
          //   radius={isFocused ? "md" : "full"}
        />
      </Badge>
    </div>
  );
};
