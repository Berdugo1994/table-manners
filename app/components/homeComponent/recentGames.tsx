"use client";

import { AppDescription, AppDescription2, AppName } from "@/app/consts/copy";
import { BoardMetadata } from "@/app/types/load";
import { GameState } from "@/lib/model/game";
import { Chip, Listbox, ListboxItem, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import StartGameButton from "../startGameButton/startGameButton";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
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
      <div className="flex justify-center items-center h-full flex-col gap-4 min-h-[200px] text-center text-black">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">Welcome to {AppName}</div>
          <div>{AppDescription}</div>
        </div>
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
    return (
      <div className="w-full">
        <ListboxWrapper>
          <Listbox
            aria-label="Listbox Variants"
            color="primary"
            variant="solid"
            className="w-full"
            classNames={{ base: "w-full" }}
            emptyContent={noRecentGamesRender()}
          >
            {recentGames &&
              recentGames.map((game, index) => (
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
                        game.state !== GameState.Finished
                          ? "success"
                          : "default"
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
    if (recentGames) {
      return recentGamesRender();
    }
    if (!recentGames) {
      return spinnerRender();
    }
  };
  return (
    <div className="min-h-[100px] w-full flex flex-col items-center justify-center">
      {compToRender()}
    </div>
  );
}
