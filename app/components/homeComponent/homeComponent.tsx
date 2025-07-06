"use client";

import { Divider } from "@heroui/react";
import { BoardMetadata, RequestType } from "../../types/load";
import { useEffect, useState } from "react";
import RecentGames from "./recentGames";
import StartGameButton from "../startGameButton/startGameButton";
import HowToComponent from "../howTo/howToComponent";
import WhatIsComponent from "../whatIs/whatIsComponent";
import ImageComponent from "./image";

export default function HomeComponent() {
  const [recentGames, setRecentGames] = useState<BoardMetadata[] | null>(null);

  useEffect(() => {
    const fetchRecentGames = async () => {
      const recentGamesResponse = await fetch("/cookies", {
        method: "POST",
        body: JSON.stringify({ requestType: RequestType.GET_RECENT_BOARDS }),
      });
      const recentGamesData = await recentGamesResponse.json();
      setRecentGames(recentGamesData);
    };
    fetchRecentGames();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 overflow-y-auto ">
      <div className="flex flex-col items-center justify-center gap-4  max-w-[100%] w-[500px]">
        <RecentGames recentGames={recentGames} />
        <Divider className="w-full radius-1" />
        <HowToComponent />
        <Divider className="w-full radius-1" />
        <ImageComponent />

        <WhatIsComponent />
        <StartGameButton />
      </div>
    </div>
  );
}
