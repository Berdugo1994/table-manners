import { Card, CardBody, Slider } from "@heroui/react";
import { Player, usePlayerStore } from "../../../store/playerStore";
import { useBoardStore } from "../../../store/boardStore";
import { useState } from "react";

const MIN_REBUY = 10;
const MAX_REBUY = 1000;

export const Rebuy = ({
  player,
  toggleFocus,
}: {
  player: Player;
  toggleFocus: () => void;
}) => {
  const { getLastRebuy, setLastRebuy } = useBoardStore();
  const { addCredits } = usePlayerStore();
  const lastRebuy = getLastRebuy();
  const [playerRebuy, setPlayerRebuy] = useState(lastRebuy);
  return (
    <Card>
      <CardBody>
        <div className="flex gap-2 items-center">
          <Slider
            // className="max-w-md"
            className="w-[100px]"
            defaultValue={lastRebuy}
            label="Rebuy"
            maxValue={MAX_REBUY}
            minValue={MIN_REBUY}
            step={5}
            value={playerRebuy}
            onChange={(value) => setPlayerRebuy(value as number)}
          />
          <i
            className="pi pi-check text-success"
            onClick={() => {
              addCredits(player.id, playerRebuy);
              setLastRebuy(playerRebuy);
              toggleFocus();
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
};
