import { Card, CardBody, Divider, Slider } from "@heroui/react";
import { Player, usePlayerStore } from "../../../store/playerStore";
import { useBoardStore } from "../../../store/boardStore";
import { useState } from "react";
import { SaveButton } from "../../saveButton/saveButton";
import { Chips, Credit } from "../../icons/credit";

const MIN_REBUY = 10;
const MAX_REBUY = 1000;
const STEP_REBUY = 5;

export const Rebuy = ({
  player,
  toggleFocus,
}: {
  player: Player;
  toggleFocus: () => void;
}) => {
  const { getLastRebuy, setLastRebuy, getRatio } = useBoardStore();
  const { addCredits } = usePlayerStore();
  const lastRebuy = getLastRebuy();
  const [playerRebuy, setPlayerRebuy] = useState(lastRebuy);

  const onSave = () => {
    addCredits(player.id, playerRebuy);
    setLastRebuy(playerRebuy);
    toggleFocus();
  };
  return (
    <Card>
      <CardBody>
        <div className="flex gap-2 items-center">
          <Slider
            className="w-[150px]"
            defaultValue={lastRebuy}
            label="Rebuy"
            maxValue={MAX_REBUY}
            minValue={MIN_REBUY}
            step={STEP_REBUY}
            value={playerRebuy}
            onChange={(value) => setPlayerRebuy(value as number)}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            renderValue={({ children, ...props }) => (
              <output {...props}>
                <div className="flex h-5 items-center space-x-1 text-small">
                  <div className="flex items-center ">
                    <Credit />
                    <div>{playerRebuy}</div>
                  </div>
                  <Divider orientation="vertical" />
                  <div className="flex items-center ">
                    <Chips />
                    <div>{playerRebuy * (getRatio() ?? 0)}</div>
                  </div>
                </div>
              </output>
            )}
          />
          <SaveButton onSave={onSave} />
        </div>
      </CardBody>
    </Card>
  );
};
