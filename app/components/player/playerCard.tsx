import classNames from "classnames";

import styles from "./player.module.css";
import { Player } from "@/app/store/playerStore";
import { Avatar, Badge } from "@heroui/react";
import { calcPlayerName } from "@/app/utils/names";

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
          name={calcPlayerName(player.name)}
          isBordered={isFocused}
          color={isFocused ? "success" : "default"}
          size={isFocused ? "lg" : "md"}
          //   radius={isFocused ? "md" : "full"}
        />
      </Badge>
    </div>
  );
};
