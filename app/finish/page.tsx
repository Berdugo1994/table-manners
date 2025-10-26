"use client";
import { Spinner } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FinalPlayer } from "../types";
import { getGame } from "../actions/game_actions";
import { sortPlayerResults } from "./utils";
import { Podium } from "../components/podium/podium";
import { Settle } from "../components/settle/settle";
import { Results } from "../components/results/results";
import TopNavbar from "../components/topNavbar/topNavbar";
import AdBanner from "../components/ads/AdBanner";

function GameResults() {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner color="success" title="Loading Game Results..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>Error loading game results</p>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT || "";
  if (publisherId === "" || adSlot === "") {
    throw new Error(
      "NEXT_PUBLIC_ADSENSE_PUBLISHER_ID or NEXT_PUBLIC_ADSENSE_AD_SLOT is not set"
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <Results players={sortedPlayers} />
      <Podium players={sortedPlayers} />
      <AdBanner
        dataAdSlot={"4604350211"}
        dataAdClient={publisherId}
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
      />
      <Settle players={sortedPlayers} />
    </div>
  );
}

export default function Finish() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[100vh]">
      <TopNavbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full">
            <Spinner color="success" title="Loading..." />
          </div>
        }
      >
        <GameResults />
      </Suspense>
    </div>
  );
}
