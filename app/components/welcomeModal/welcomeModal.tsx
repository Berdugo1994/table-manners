import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@heroui/react";
import styles from "./styles.module.css";
import { PiHandsClapping } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { getDefaultGameName } from "@/app/utils/setup";
import { Chips, Credit } from "../icons/credit";

export const WelcomeModal = ({
  isModalOpen,
  onSubmit,
}: {
  isModalOpen: boolean;
  onSubmit: (gameName: string, ratio: number, buyIn: number) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const [gameName, setGameName] = useState(getDefaultGameName());
  const [ratio, setRatio] = useState<number>(25);
  const [buyIn, setBuyIn] = useState<number>(40);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "gameName") {
      setGameName(value);
    } else if (name === "ratio") {
      setRatio(Number(value));
    } else if (name === "buyIn") {
      setBuyIn(Number(value));
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={() => {}}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col gap-4 mt-2 p-2">
            <div className="flex gap-2 items-center">
              <div
                className={classNames(styles.inlineText, "text-2xl font-bold")}
              >
                Welcome to
              </div>
              <Input
                ref={ref}
                value={gameName}
                placeholder="Game Name"
                size="sm"
                variant="bordered"
                color="primary"
                radius="sm"
                isRequired
                isInvalid={!validateGameName(gameName)}
                onChange={handleChange}
                name="gameName"
              />
              <PiHandsClapping className={styles.handsClapping} />
            </div>
            <div className="flex items-center gap-2">
              <div className={styles.inlineText}>Here, every </div>
              <Credit />
              <div>Worth</div>
              <Input
                size="sm"
                className="max-w-[130px]"
                endContent={
                  <div className="pointer-events-none flex  items-center">
                    <span className="text-default-400 text-small"></span>
                    Chips <Chips />
                  </div>
                }
                min={1}
                value={"" + ratio}
                type="number"
                isRequired
                isInvalid={!validateRatio(ratio)}
                onChange={handleChange}
                name="ratio"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className={styles.inlineText}>And initial buy-in is</div>
              <Input
                size="sm"
                className="max-w-[130px]"
                endContent={
                  <div className="pointer-events-none flex  items-center">
                    <span className="text-default-400 text-small"></span>
                    <Credit />
                  </div>
                }
                value={"" + buyIn}
                type="number"
                isRequired
                isInvalid={!validateBuyIn(buyIn)}
                onChange={handleChange}
                name="buyIn"
                min={1}
              />
            </div>
            {buyIn > 0 && ratio > 0 && (
              <div
                className={classNames(
                  "text-sm text-gray-500 border-2 border-gray-500 rounded-md p-2 w-full flex-wrap overflow-hidden",
                  styles.exampleText
                )}
              >
                So, for example, Each player will pay <Credit />
                {buyIn} to start with {buyIn * ratio} chips.
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={
              !validateGameName(gameName) ||
              !validateRatio(ratio) ||
              !validateBuyIn(buyIn)
            }
            color="success"
            onPress={() => onSubmit(gameName, ratio, buyIn)}
          >
            Let&apos;s Play!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function validateGameName(gameName: string) {
  return gameName.length > 0;
}

function validateRatio(ratio: number | null) {
  return ratio !== null && ratio > 0;
}

function validateBuyIn(buyIn: number) {
  return buyIn > 0;
}
