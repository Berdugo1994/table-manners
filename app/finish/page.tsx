"use client";
import { Spinner } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FinalPlayer } from "../types";
import { getGame } from "../actions/game_actions";
import { sortPlayerResults } from "./utils";

export default function Finish() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const gameIdNumber = Number(gameId);
  const [game, setGame] = useState<FinalPlayer[] | null>(null);
  const sortedPlayers = sortPlayerResults(game ?? []);
  useEffect(() => {
    if (gameId && !isNaN(gameIdNumber)) {
      getGame(gameIdNumber).then((game) => {
        setGame(game);
        setIsLoading(false);
      });
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }, [gameId, gameIdNumber]);
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner color="success" title="Loading Game Results..." />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center w-full h-full">
          <p>Error loading game results</p>
        </div>
      )}
      {game && (
        <div>
          {sortedPlayers.map((player) => (
            <div key={player.name}>
              {player.name} | {player.credits} | {player.chips} | % {player.pnl}{" "}
              %
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
