import { Player, usePlayerStore } from "../../../store/playerStore";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Input } from "@heroui/react";

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
          input: "w-[50px]",
        }}
        ref={nameInputRef}
        placeholder={player?.name ?? "Name" + player.id}
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
