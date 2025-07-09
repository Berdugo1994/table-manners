import { calcPlayerName } from "@/app/utils/names";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import {
  CustomPlusButton,
  CustomRemoveButton,
} from "../player/plusButton/plusButton";
import { usePlayerStore } from "@/app/store/playerStore";
import { useBoardStore } from "@/app/store/boardStore";

export default function AddPlayersModal({ onClose }: { onClose: () => void }) {
  const { getBuyIn } = useBoardStore();
  const PlayerStore = usePlayerStore();
  const [playersToAdd, setPlayersToAdd] = useState<string[]>([""]);

  const handleAddPlayer = () => {
    setPlayersToAdd([...playersToAdd, ""]);
  };

  const handleRemovePlayer = (indexToRemove: number) => {
    setPlayersToAdd(playersToAdd.filter((_, index) => index !== indexToRemove));
  };

  const handlePlayerNameChange = (index: number, newValue: string) => {
    setPlayersToAdd(
      playersToAdd.map((player, i) => (i === index ? newValue : player))
    );
  };

  return (
    <Modal
      isOpen={true}
      size="lg"
      classNames={{ base: "max-h-[80%] overflow-y-auto" }}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader>
          <div>Add Players</div>
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-2 flex-wrap">
            {playersToAdd.map((player, index) => (
              <Card key={index} classNames={{ header: "p-0", body: "pt-1" }}>
                <CardHeader>
                  <div className="w-full flex justify-end">
                    <CustomRemoveButton
                      onClick={() => handleRemovePlayer(index)}
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex gap-2 items-center flex-col">
                    <Avatar
                      showFallback
                      name={calcPlayerName(player)}
                      isBordered={player?.length > 0}
                      color={"default"}
                      size={"md"}
                    />
                    <Input
                      className="w-20"
                      maxLength={20}
                      value={player}
                      onValueChange={(value) =>
                        handlePlayerNameChange(index, value)
                      }
                      placeholder="Name"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddPlayer();
                        }
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            ))}
            {playersToAdd.length < 8 && (
              <div className="flex justify-center items-center px-2">
                <CustomPlusButton onClick={handleAddPlayer} />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              const buyIn = getBuyIn() ?? 0;
              playersToAdd.forEach((playerName) => {
                PlayerStore.createPlayer(buyIn, playerName);
              });
              onClose();
            }}
            isDisabled={
              playersToAdd.length <= 2 ||
              playersToAdd.some((player) => !player.trim())
            }
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
