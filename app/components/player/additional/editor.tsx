import { Player, usePlayerStore } from "@/app/store/playerStore";
import { Card, CardBody, Input } from "@heroui/react";
import { SaveButton } from "../../saveButton/saveButton";
import { useState } from "react";

export const Editor = ({
  player,
  toggleFocus,
}: {
  player: Player;
  toggleFocus: () => void;
}) => {
  const updatePlayer = usePlayerStore((state) => state.updatePlayer);
  const [name, setName] = useState(player.name);
  const [credits, setCredits] = useState(player.credits);

  const onSave = () => {
    updatePlayer(player.id, {
      name,
      credits,
    });
    toggleFocus();
  };
  return (
    <Card>
      <CardBody>
        <div className="flex flex-row">
          <div className="flex flex-col w-40 gap-1">
            <Input
              placeholder={player.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSave();
                }
              }}
            />
            <Input
              placeholder={player.credits.toString()}
              type="number"
              value={credits.toString()}
              onChange={(e) => {
                console.log("credits", e.target.value);
                setCredits(Number(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSave();
                }
              }}
            />
          </div>
          <SaveButton className="h-20 ml-2" onSave={onSave} />
        </div>
      </CardBody>
    </Card>
  );
};
