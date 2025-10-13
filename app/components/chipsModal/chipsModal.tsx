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
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useBoardStore } from "@/app/store/boardStore";
import classNames from "classnames";
import { MdSafetyDivider } from "react-icons/md";
type ChipType = number | undefined;
const isValidChip = (chip: ChipType) => {
  return chip === 0 || (chip && chip > 0);
};

const calcDivide = (chipsLeft: number, playersAmount: number) => {
  return chipsLeft / playersAmount;
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
  const positivePlayersCount = tempChips.filter((x) => x > 0).length;

  useEffect(() => {
    setTempChips(players.map((player) => player.checkoutChips));
  }, [players]);

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const onSave = () => {
    setIsSaveLoading(true);
    onFinishClick(tempChips);
  };
  // If one of the players has a negative chip, set chipsLeft to "-"
  const chipsLeft =
    totalChips - tempChips.reduce((acc, chip) => acc + (chip ?? 0), 0);

  const amountOfDividers =
    chipsLeft < 0 ? positivePlayersCount : players.length;

  const DivideChipsText = useMemo(() => {
    if (chipsLeft == 0 || amountOfDividers == 0) return null;
    const toDivide = calcDivide(chipsLeft, amountOfDividers);
    return `${toDivide > 0 ? "+" : ""}${toDivide.toFixed(1)}`;
  }, [chipsLeft, amountOfDividers]);

  const onDivideChips = () => {
    if (chipsLeft == 0 || amountOfDividers == 0) return;
    const toDivide = Math.round(calcDivide(chipsLeft, amountOfDividers));
    let leftover = chipsLeft - toDivide * amountOfDividers;
    setTempChips((tChips) =>
      tChips.map((chip) => {
        if (toDivide < 0 && chip <= 0) {
          return 0;
        }
        const amountToAdd = toDivide + leftover;
        leftover = 0;
        return Math.max(0, chip + amountToAdd);
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
                {chipsLeft != 0 && (
                  <div
                    className={classNames("flex space-x-2 justify-center mb-2")}
                  >
                    <Chip>Chips Left {chipsLeft}</Chip>
                    {DivideChipsText && (
                      <Button color="primary" size="sm" onPress={onDivideChips}>
                        <div className="flex items-center gap-1">
                          <MdSafetyDivider size={24} />
                          <div className="text-xs">{DivideChipsText}</div>
                        </div>
                      </Button>
                    )}
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
                        value={tempChips[index].toString()}
                        onChange={(e) => {
                          let value = Number(
                            (e as ChangeEvent<HTMLInputElement>)?.target
                              ?.value || e
                          );
                          value = isNaN(value) ? 0 : value;
                          const newTempChips = [...tempChips];
                          newTempChips[index] = value;
                          setTempChips(newTempChips);
                          return value;
                        }}
                        isInvalid={tempChips[index] != 0 && !tempChips[index]}
                        placeholder="# of Chips"
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
