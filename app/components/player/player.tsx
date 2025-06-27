import classNames from "classnames";
import styles from "./player.module.css";
import { useState, useEffect } from "react";
import { usePlayerStore, type Player } from "../../store/playerStore";
import AdditionalPlayerLayout from "./additional/additionalPlayerLayout";
import { NameEditor } from "./additional/nameEditor";
import { BoardSize } from "@/app/consts/size";
import { Menu } from "./additional/menu";
import { Rebuy } from "./additional/rebuy";
import { ActionState } from "./additional/types";
import { PlayerCard } from "./playerCard";

interface PlayerProps {
  playerId: number;
  isFocused: boolean;
  toggleFocus: () => void;
}

const defaultActionState: ActionState = {
  menu: false,
  name: true,
  rebuy: false,
};

export default function Player(props: PlayerProps) {
  const [actionState, setActionState] =
    useState<ActionState>(defaultActionState);
  const { playerId, isFocused, toggleFocus } = props;
  const { getPlayer } = usePlayerStore();

  const updatePartlyState = (state: Partial<ActionState>) => {
    setActionState((prev) => ({ ...prev, ...state }));
  };

  const player = getPlayer(playerId);
  if (!player) {
    throw new Error("Player not found");
  }
  const { rowIndex, columnIndex } = player;

  useEffect(() => {
    if (isFocused && !actionState.name) {
      updatePartlyState({ menu: true });
    }
    if (!isFocused) {
      updatePartlyState({ menu: false, name: false, rebuy: false });
    }
  }, [isFocused]);

  const getAdditionalContent = () => {
    if (actionState.name) {
      return <NameEditor toggleFocus={toggleFocus} player={player} />;
    }
    if (actionState.menu) {
      return (
        <Menu
          toggleFocus={toggleFocus}
          player={player}
          updatePartlyState={updatePartlyState}
        />
      );
    }
    if (actionState.rebuy) {
      return <Rebuy player={player} toggleFocus={toggleFocus} />;
    }

    return null;
  };

  const getPlayerCellStyle = (playerColumn: number, playerRow: number) => {
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
      <PlayerCard
        toggleFocus={toggleFocus}
        player={player}
        isFocused={isFocused}
      />
      <AdditionalPlayerLayout rowIndex={rowIndex} columnIndex={columnIndex}>
        {getAdditionalContent()}
      </AdditionalPlayerLayout>
    </div>
  );
}
