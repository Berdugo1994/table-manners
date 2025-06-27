import classNames from "classnames";
import styles from "./player.module.css";
import { useState, useEffect } from "react";
import { usePlayerStore, type Player } from "../../store/playerStore";
import AdditionalPlayerLayout from "./additional/additionalPlayerLayout";
import { NameEditor } from "./additional/nameEditor";
import { BoardSize } from "@/app/consts/size";

interface PlayerProps {
  playerId: number;
  isFocused: boolean;
  toggleFocus: () => void;
}

type ActionState = {
  menu: boolean;
  name: boolean;
};

const defaultActionState: ActionState = {
  menu: false,
  name: true,
};

export default function Player(props: PlayerProps) {
  const [actionState, setActionState] =
    useState<ActionState>(defaultActionState);
  const { playerId, isFocused, toggleFocus } = props;
  const { getPlayer } = usePlayerStore();

  const updateSingleState = (state: Partial<ActionState>) => {
    setActionState((prev) => ({ ...prev, ...state }));
  };

  const player = getPlayer(playerId);
  if (!player) {
    throw new Error("Player not found");
  }
  const { rowIndex, columnIndex } = player;

  useEffect(() => {
    console.log("isFocused", isFocused);
    console.log("actionState", actionState);
    if (isFocused && !actionState.name) {
      updateSingleState({ menu: true });
    }
    if (!isFocused) {
      updateSingleState({ menu: false, name: false });
    }
  }, [isFocused]);

  const getAdditionalContent = () => {
    if (actionState.name) {
      return <NameEditor toggleFocus={toggleFocus} player={player} />;
    }
    if (actionState.menu) {
      console.log("menu");
      return <div>Menu</div>;
    }

    return null;
  };

  const getPlayerCellStyle = (playerColumn: number, playerRow: number) => {
    console.log("playerColumn", playerColumn);
    console.log("playerRow", playerRow);
    const start =
      playerColumn -
      (playerColumn === 1
        ? 0
        : playerColumn === 21
        ? BoardSize.PLAYER_CELL_WIDTH - 1
        : 1);
    const end = start + BoardSize.PLAYER_CELL_WIDTH;
    return {
      gridColumnStart: start,
      gridColumnEnd: end,
      gridRowStart: playerRow,
    };
  };

  return (
    <div
      className={classNames(styles.playerContainer, {
        [styles.focused]: isFocused,
      })}
      style={getPlayerCellStyle(columnIndex, rowIndex)}
    >
      <div
        className={classNames(styles.playerName)}
        onClick={() => {
          toggleFocus();
        }}
      >
        {player?.name || "Name" + playerId}
      </div>
      <AdditionalPlayerLayout rowIndex={rowIndex} columnIndex={columnIndex}>
        {getAdditionalContent()}
      </AdditionalPlayerLayout>
    </div>
  );
}
