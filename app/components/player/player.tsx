import classNames from "classnames";
import styles from "./player.module.css";
import { useState, useRef, useEffect } from "react";
import { usePlayerStore, type Player } from "../../store/playerStore";
import { Input } from "@heroui/react";
import AdditionalPlayerLayout from "./additional/additionalPlayerLayout";

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
  const { getPlayer, updatePlayerName } = usePlayerStore();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const player = getPlayer(playerId);
  if (!player) {
    throw new Error("Player not found");
  }
  const { rowIndex, columnIndex } = player;

  useEffect(() => {
    if (!isFocused) {
      setActionState({ menu: false, name: false });
    }
  }, [isFocused]);

  useEffect(() => {
    // focus on name input when name action is active
    if (actionState.name && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [actionState.name]);

  const renderNameEditor = () => {
    const onSave = () => {
      updatePlayerName(playerId, nameInputRef.current?.value);
      toggleFocus();
    };
    return (
      <div className={styles.playerNameInputContainer}>
        <Input
          classNames={{
            input: "w-[50px]",
          }}
          ref={nameInputRef}
          placeholder={player?.name ?? "Name" + playerId}
          type="text"
          size="sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave();
            }
          }}
        />
        <div className={classNames(styles.saveButton, "text-success")}>
          <i
            className="pi pi-check "
            onClick={() => {
              onSave();
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={classNames(styles.playerContainer, {
        [styles.focused]: isFocused,
      })}
      style={{
        gridColumnStart: player.columnIndex,
        gridRowStart: player.rowIndex,
      }}
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
        {actionState.name && renderNameEditor()}
      </AdditionalPlayerLayout>
    </div>
  );
}
