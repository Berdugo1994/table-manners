import { Button } from "@heroui/button";
import styles from "./styles.module.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import classNames from "classnames";
import { usePlayerStore } from "@/app/store/playerStore";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { finishGame } from "@/app/actions/game_actions";
import ChipsModal from "../chipsModal/chipsModal";

export default function Settings({ gameId }: { gameId: number }) {
  const players = usePlayerStore((state) => state.players);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const onFinishClick = async (playersChips: number[]) => {
    setIsLoading(true);
    const res = await finishGame(gameId, players, playersChips);
    setIsLoading(false);
    if (res) {
      router.replace(`/finish?gameId=${gameId}`);
    }
  };

  const ChipsModalComponent = useMemo(() => {
    return (
      <ChipsModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onFinishClick={(playersChips: number[]) => onFinishClick(playersChips)}
      />
    );
  }, [isModalOpen, setIsModalOpen, onFinishClick, players]);

  return (
    <div className={styles.settingsContainer}>
      {isLoading && <div className={styles.loading}>Saving...</div>}
      {!isLoading && (
        <Dropdown
          classNames={{
            content: "max-w-content min-w-[150px]",
          }}
        >
          <DropdownTrigger>
            <Button className={styles.settingsIcon} size="sm">
              <i className="pi pi-cog" style={{ fontSize: "24px" }}></i>
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="chips-modal"
              onPress={() => setIsModalOpen(true)}
            >
              <div className={classNames(styles.menuItem, "gap-1 text-lg h-3")}>
                <i className="pi pi-dollar"></i>
                <div>Finish</div>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      {ChipsModalComponent}
    </div>
  );
}
