import { Button, Card, CardBody } from "@heroui/react";
import { usePlayerStore } from "../../store/playerStore";

interface PlayerActionsProps {
  playerId: number;
}

export default function PlayerActions({ playerId }: PlayerActionsProps) {
  const { addBuyIn, removeBuyIn, getPlayer } = usePlayerStore();
  const player = getPlayer(playerId);

  const handleAddBuyIn = () => {
    addBuyIn(playerId, 100);
  };

  const handleRemoveBuyIn = () => {
    removeBuyIn(playerId, 100);
  };

  if (!player) return null;

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium mb-2">
            {player.name} - ${player.buyIns}
          </div>
          <Button size="sm" onClick={handleAddBuyIn}>
            Add $100
          </Button>
          <Button size="sm" onClick={handleRemoveBuyIn}>
            Remove $100
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
