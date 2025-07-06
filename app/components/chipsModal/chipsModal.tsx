import { usePlayerStore } from "@/app/store/playerStore";
import {
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { SaveButton } from "../saveButton/saveButton";
import { PlayerCard } from "../player/playerCard";
import { useState } from "react";
import { useBoardStore } from "@/app/store/boardStore";
import classNames from "classnames";
type ChipType = number | undefined;
const isValidChip = (chip: ChipType) => {
  return chip === 0 || (chip && chip > 0);
};

export default function ChipsModal({
  isOpen,
  setIsModalOpen,
  onFinishClick,
}: {
  isOpen: boolean;
  setIsModalOpen: (f: boolean) => void;
  onFinishClick: (playersChips: number[]) => void;
}) {
  const { getRatio } = useBoardStore();
  const credits = usePlayerStore((state) => state.getAllCredits());
  const totalChips = credits * (getRatio() ?? 0);
  const players = usePlayerStore((state) => state.players);
  const [tempChips, setTempChips] = useState<number[]>(players.map(() => 0));
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const onSave = () => {
    setIsSaveLoading(true);
    onFinishClick(tempChips);
  };
  const chipsLeft = tempChips.every((x) => x >= 0)
    ? totalChips - tempChips.reduce((acc, chip) => acc + chip, 0)
    : "-";

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ModalContent>
          <ModalHeader>Number Of Chips</ModalHeader>
          <ModalBody>
            {isSaveLoading && (
              <div className="flex justify-center items-center w-full h-full mb-4">
                <Spinner color="success" />
              </div>
            )}
            {!isSaveLoading && (
              <div className="flex flex-col gap-2">
                {chipsLeft != "-" && chipsLeft != 0 && (
                  <div
                    className={classNames(
                      "h-5 flex space-x-2 justify-center mb-8"
                    )}
                  >
                    <Chip className="w-10 h-10">Chips Left {chipsLeft}</Chip>
                  </div>
                )}
                <div className="flex flex-row flex-wrap gap-x-2 gap-y-1 justify-center">
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex flex-col items-center gap-0.5 w-[100px]"
                    >
                      <PlayerCard
                        player={player}
                        isFocused={false}
                        onPlayerClick={() => {}}
                      />
                      <Input
                        size="sm"
                        type="number"
                        value={tempChips[index]?.toString() ?? ""}
                        onChange={(e) => {
                          const newTempChips = [...tempChips];
                          newTempChips[index] = parseInt(e.target.value);
                          setTempChips(newTempChips);
                        }}
                        isInvalid={tempChips[index] != 0 && !tempChips[index]}
                        placeholder="# Chips"
                      />
                    </div>
                  ))}
                </div>
                <SaveButton
                  className="w-full"
                  onSave={onSave}
                  addedText="Finish Game"
                  isDisabled={!tempChips.every(isValidChip) || chipsLeft != 0}
                />
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
