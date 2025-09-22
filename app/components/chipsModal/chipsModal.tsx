import { usePlayerStore } from "@/app/store/playerStore";
import {
  Button,
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
import { useState, useEffect, useMemo } from "react";
import { useBoardStore } from "@/app/store/boardStore";
import classNames from "classnames";
import { MdSafetyDivider } from "react-icons/md";
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
  const [tempChips, setTempChips] = useState<number[]>(
    players.map((player) => player.checkoutChips)
  );
  const calcDivide = (chipsLeft: number, playersAmount: number) => {
    return chipsLeft / playersAmount;
  };

  useEffect(() => {
    setTempChips(players.map((player) => player.checkoutChips));
  }, [players]);

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const onSave = () => {
    setIsSaveLoading(true);
    onFinishClick(tempChips);
  };
  const chipsLeft = tempChips.every((x) => x >= 0)
    ? totalChips - tempChips.reduce((acc, chip) => acc + chip, 0)
    : "-";

  const DivideChips = useMemo(() => {
    if (chipsLeft == "-" || chipsLeft == 0) return null;
    const toDivide = calcDivide(chipsLeft, players.length);
    return toDivide > 0 ? "+" + toDivide.toFixed(1) : toDivide.toFixed(1);
  }, [chipsLeft, players]);

  const onDivideChips = () => {
    if (chipsLeft == "-" || chipsLeft == 0) return;
    const toDivide = Math.round(calcDivide(chipsLeft, players.length));
    const leftover = chipsLeft - toDivide * players.length;
    setTempChips((tChips) =>
      tChips.map((chip, index) => {
        if (index == 0) {
          return chip + toDivide + leftover;
        }
        return chip + toDivide;
      })
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        size="lg"
        classNames={{ base: "max-h-[90vh] overflow-y-auto" }}
        scrollBehavior="inside"
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
                    className={classNames("flex space-x-2 justify-center mb-2")}
                  >
                    <Chip>Chips Left {chipsLeft}</Chip>
                    <Button color="primary" size="sm" onPress={onDivideChips}>
                      <div className="flex items-center gap-1">
                        <MdSafetyDivider size={24} />
                        <div className="text-xs">{DivideChips}</div>
                      </div>
                    </Button>
                  </div>
                )}
                <div className="flex flex-row flex-wrap gap-2 justify-center">
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex flex-col items-center gap-1 w-[100px] min-w-[80px]"
                    >
                      <PlayerCard
                        player={player}
                        isFocused={false}
                        onPlayerClick={() => {}}
                        isCheckedOut={player.isCheckedOut}
                      />
                      <Input
                        min={0}
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
