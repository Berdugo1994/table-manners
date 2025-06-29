import { Player, usePlayerStore } from "../../../store/playerStore";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Input } from "@heroui/react";
import { SaveButton } from "../../saveButton/saveButton";

export const NameEditor = ({
  toggleFocus,
  player,
}: {
  toggleFocus: () => void;
  player: Player;
}) => {
  const { updatePlayerName } = usePlayerStore();
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const onSave = () => {
    updatePlayerName(player.id, nameInputRef.current?.value);
    toggleFocus();
  };
  return (
    <div className={styles.playerNameInputContainer}>
      <Input
        classNames={{
          // input: "w-[1px]",
          inputWrapper: "min-w-[100px]",
        }}
        ref={nameInputRef}
        placeholder={player.name}
        defaultValue={player.name}
        type="text"
        size="sm"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave();
          }
        }}
      />
      <SaveButton onSave={onSave} />
    </div>
  );
};
