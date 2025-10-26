"use client";

import { Divider } from "@heroui/react";
import { BoardMetadata, RequestType } from "../../types/load";
import { useEffect, useState } from "react";
import RecentGames from "./recentGames";
import StartGameButton from "../startGameButton/startGameButton";
import HowToComponent from "../howTo/howToComponent";
import WhatIsComponent from "../whatIs/whatIsComponent";
import TopNavbar from "../topNavbar/topNavbar";
import Faq from "../faq/faq";
import QuoteComponent from "../quote/howToComponent";
import Image from "next/image";
import imageMonkeyChipsFlying from "@/app/assets/homepage/monkey-chips-flying.png";
import { Counter } from "../counter/counter";

export default function HomeComponent() {
  const [recentGames, setRecentGames] = useState<BoardMetadata[] | null>(null);

  useEffect(() => {
    const fetchRecentGames = async () => {
      console.log("fetching recent games");
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
    <div className="w-full flex flex-col items-center justify-center overflow-y-auto ">
      <TopNavbar />
      <div className="flex flex-col items-center justify-center gap-4 p-2 max-w-[100%] w-[500px]">
        <RecentGames recentGames={recentGames} />
        <StartGameButton title="Start free now!" />
        <Image
          src={imageMonkeyChipsFlying}
          alt="monkey chips flying"
          width={250}
          height={250}
        />
        <QuoteComponent />
        <Counter />
        <Divider className="w-full radius-1" />
        <HowToComponent />
        <Divider className="w-full radius-1" />
        {/* <ImageComponent /> */}

        <WhatIsComponent />
        <Divider className="w-full radius-1" />
        <Faq />
        <StartGameButton />
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <a href="/policy" className="underline">
          Policy
        </a>
      </div>
    </div>
  );
}
