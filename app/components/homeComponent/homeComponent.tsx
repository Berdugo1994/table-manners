"use client";

import { Divider } from "@heroui/react";
import { BoardMetadata, RequestType } from "../../types/load";
import { useEffect, useState } from "react";
import RecentGames from "./recentGames";
import StartGameButton from "../startGameButton/startGameButton";
import HowToComponent from "../howTo/howToComponent";
import WhatIsComponent from "../whatIs/whatIsComponent";
// import ImageComponent from "./image";
import AdBanner from "../ads/AdBanner";
import TopNavbar from "../topNavbar/topNavbar";
import Faq from "../faq/faq";
import QuoteComponent from "../quote/howToComponent";

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
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT || "";
  if (publisherId === "" || adSlot === "") {
    throw new Error(
      "NEXT_PUBLIC_ADSENSE_PUBLISHER_ID or NEXT_PUBLIC_ADSENSE_AD_SLOT is not set"
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 overflow-y-auto ">
      <TopNavbar />
      <div className="flex flex-col items-center justify-center gap-4  max-w-[100%] w-[500px]">
        <QuoteComponent />
        <Divider className="w-full radius-1" />
        <div className="w-full h-[10px]" id="google-ad-placeholder">
          <AdBanner
            dataAdSlot={adSlot}
            dataAdClient={publisherId}
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
          />
        </div>
        <RecentGames recentGames={recentGames} />
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
