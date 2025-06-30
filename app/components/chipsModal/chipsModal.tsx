import { usePlayerStore } from "@/app/store/playerStore";
import {
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
  const players = usePlayerStore((state) => state.players);
  const [tempChips, setTempChips] = useState<number[]>(players.map(() => 0));
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const onSave = () => {
    setIsSaveLoading(true);
    onFinishClick(tempChips);
  };

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
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 justify-center">
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex flex-col items-center gap-1 w-[100px]"
                    >
                      <PlayerCard
                        player={player}
                        isFocused={false}
                        onPlayerClick={() => {}}
                      />
                      <Input
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
                  isDisabled={!tempChips.every(isValidChip)}
                />
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
