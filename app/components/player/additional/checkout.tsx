import { addToast, Card, CardBody, Divider, Slider } from "@heroui/react";
import { Player, usePlayerStore } from "../../../store/playerStore";
import { useBoardStore } from "../../../store/boardStore";
import { useMemo, useState } from "react";
import { SaveButton } from "../../saveButton/saveButton";
import { Chips, Credit } from "../../icons/credit";
import { updateWhileGameIsRunning } from "@/app/actions/game_actions";
import { CustomMinusButton, CustomPlusButton } from "../plusButton/plusButton";

const STEP_CHECKOUT = 5;

export const Checkout = ({
  player,
  toggleFocus,
}: {
  player: Player;
  toggleFocus: () => void;
}) => {
  const { getGameId, getRatio } = useBoardStore();
  const { setPlayerCheckoutChips, getPlayerCheckoutChips, getAllCredits } =
    usePlayerStore();
  const [currentPlayerCheckoutChips, setCurrentPlayerCheckoutChips] = useState(
    getPlayerCheckoutChips(player.id)
  );

  const maxChips = useMemo(() => {
    return Math.round(getAllCredits() * getRatio());
  }, [getAllCredits, getRatio]);

  const onSave = () => {
    setPlayerCheckoutChips(player.id, currentPlayerCheckoutChips);
    toggleFocus();
    setTimeout(() => {
      const { players: updatedPlayers } = usePlayerStore.getState();
      updateWhileGameIsRunning(getGameId(), updatedPlayers).then((res) => {
        if (!res) {
          console.error("Failed to update players");
        } else {
          console.log("Players updated");
          addToast({
            title: "Board saved",
            color: "success",
            classNames: {
              base: "max-w-[200px]",
            },
          });
        }
      });
    }, 1000);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex gap-2 items-center">
          <div className="flex items-end gap-0">
            <CustomMinusButton
              onClick={() => {
                setCurrentPlayerCheckoutChips(
                  currentPlayerCheckoutChips - STEP_CHECKOUT
                );
              }}
            />
            <Slider
              className="w-[150px]"
              defaultValue={player.checkoutChips}
              label="Checkout "
              maxValue={maxChips}
              minValue={0}
              step={STEP_CHECKOUT}
              value={currentPlayerCheckoutChips}
              onChange={(value) =>
                setCurrentPlayerCheckoutChips(value as number)
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderValue={({ children, ...props }) => (
                <output {...props}>
                  <div className="flex h-5 items-center space-x-1 text-small">
                    <div className="ml-1 flex items-center ">
                      <Credit />
                      <div>
                        {Math.round(currentPlayerCheckoutChips / getRatio())}
                      </div>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="flex items-center ">
                      <Chips />
                      <div>{currentPlayerCheckoutChips}</div>
                    </div>
                  </div>
                </output>
              )}
            />
            <CustomPlusButton
              onClick={() => {
                setCurrentPlayerCheckoutChips(
                  currentPlayerCheckoutChips + STEP_CHECKOUT
                );
              }}
            />
          </div>
          <SaveButton onSave={onSave} className="min-h-[48px]" />
        </div>
      </CardBody>
    </Card>
  );
};
