"use client";

import { AppDescription, AppDescription2, AppName } from "@/app/consts/copy";
import { BoardMetadata } from "@/app/types/load";
import { GameState } from "@/lib/model/game";
import {
  Card,
  CardBody,
  Chip,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import StartGameButton from "../startGameButton/startGameButton";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const isMostRecent = (index: number) => {
  return index === 0;
};

export default function RecentGames({
  recentGames,
}: {
  recentGames: BoardMetadata[] | null;
}) {
  const router = useRouter();

  const noRecentGamesRender = () => {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-4 min-h-[200px] text-center">
        <div className="text-2xl font-bold">Welcome to {AppName}</div>
        <div>{AppDescription}</div>
        <div>{AppDescription2}</div>
        <StartGameButton title="Start free now!" />
      </div>
    );
  };

  const spinnerRender = () => {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-4">
        <Spinner />
        <div className="text-sm">Loading recent games...</div>
      </div>
    );
  };

  const recentGamesRender = () => {
    if (!recentGames || recentGames.length <= 0) {
      return null;
    }
    return (
      <div>
        {recentGames.length > 0 && (
          <div className=" text-center text-lg">Last Games</div>
        )}
        <ListboxWrapper>
          <Listbox
            aria-label="Listbox Variants"
            color="primary"
            variant="solid"
          >
            {recentGames.map((game, index) => (
              <ListboxItem
                onPress={() => {
                  router.push(
                    `/${
                      game.state !== GameState.Finished ? "play" : "finish"
                    }?gameId=${game.gameSerialNumber}`
                  );
                }}
                key={game.gameSerialNumber}
                classNames={{
                  base: isMostRecent(index) ? "" : "",
                }}
              >
                <div className="flex flex-row justify-between w-full gap-5 items-center">
                  <div>{game.gameName}</div>

                  <Chip
                    color={
                      game.state !== GameState.Finished ? "success" : "default"
                    }
                  >
                    {game.state}
                  </Chip>
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        </ListboxWrapper>
      </div>
    );
  };
  const compToRender = () => {
    if (recentGames && recentGames.length > 0) {
      return recentGamesRender();
    }
    if (recentGames && recentGames.length <= 0) {
      return noRecentGamesRender();
    }
    if (!recentGames) {
      return spinnerRender();
    }
  };
  return (
    <Card
      className="min-h-[200px]"
      classNames={{ body: "flex flex-col items-center justify-center" }}
    >
      <CardBody>{compToRender()}</CardBody>
    </Card>
  );
}
