import classNames from "classnames";

import styles from "./player.module.css";
import { Player } from "@/app/store/playerStore";
import { Avatar, Badge, Chip } from "@heroui/react";
import { calcPlayerName } from "@/app/utils/names";

export const PlayerCard = ({
  player,
  isFocused,
  onPlayerClick,
  isCheckedOut,
}: {
  player: Player;
  isFocused: boolean;
  onPlayerClick: () => void;
  isCheckedOut: boolean;
}) => {
  return (
    <div
      className={classNames(styles.playerCard, {
        [styles.focused]: isFocused,
      })}
      onClick={onPlayerClick}
    >
      <Badge
        color={isCheckedOut ? "danger" : "primary"}
        content={player.credits}
      >
        <Avatar
          showFallback
          name={calcPlayerName(player.name)}
          isBordered={isFocused}
          color={isFocused ? "success" : "default"}
          size={isFocused ? "lg" : "md"}
          //   radius={isFocused ? "md" : "full"}
        />
      </Badge>

      <Chip size="sm">{player.name}</Chip>
    </div>
  );
};
