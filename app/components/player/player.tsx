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
import { Editor } from "./additional/editor";
import { Checkout } from "./additional/checkout";

interface PlayerProps {
  playerId: number;
  isFocused: boolean;
  toggleFocus: () => void;
}

const defaultActionState: ActionState = {
  name: true,
  menu: false,
  rebuy: false,
  editor: false,
  checkout: false,
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
      //Open menu when its not first opening
      updatePartlyState({ menu: true });
    }

    if (!isFocused) {
      //Reset all states when player is closed
      updatePartlyState({
        menu: false,
        name: false,
        rebuy: false,
        editor: false,
        checkout: false,
      });
    }
  }, [isFocused, actionState.name]);

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
    if (actionState.editor) {
      return <Editor player={player} toggleFocus={toggleFocus} />;
    }
    if (actionState.checkout) {
      return <Checkout player={player} toggleFocus={toggleFocus} />;
    }

    return null;
  };

  const getPlayerCellStyle = (playerColumn: number, playerRow: number) => {
    const start =
      playerColumn -
      (playerColumn === 2
        ? 0
        : playerColumn === 20
        ? BoardSize.PLAYER_CELL_WIDTH - 1
        : 1);
    const end = start + BoardSize.PLAYER_CELL_WIDTH;
    return {
      gridColumnStart: start,
      gridColumnEnd: end,
      gridRowStart: playerRow,
    };
  };
  const onPlayerClick = () => {
    if (actionState.name) {
      return;
    }
    toggleFocus();
  };

  return (
    <div
      className={classNames(styles.playerContainer, {
        [styles.focused]: isFocused,
      })}
      style={getPlayerCellStyle(columnIndex, rowIndex)}
    >
      <PlayerCard
        player={player}
        isFocused={isFocused}
        onPlayerClick={onPlayerClick}
        isCheckedOut={player.isCheckedOut}
      />
      <AdditionalPlayerLayout
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        playerId={playerId}
      >
        {getAdditionalContent()}
      </AdditionalPlayerLayout>
    </div>
  );
}
