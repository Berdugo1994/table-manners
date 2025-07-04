"use client";
import React, { useEffect } from "react";
import PlayingBoard from "../components/board/playingBoard";
import { useSearchParams } from "next/navigation";

export default function Play() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  useEffect(() => {
    if (gameId) {
      // Update cookies via API route
      fetch(`/cookies?gameId=${gameId}`, {
        method: "GET",
        credentials: "include", // Important for cookies
      }).catch(console.error);
    }
  }, [gameId]);

  if (!gameId) {
    return <div>No gameId</div>;
  }

  return <PlayingBoard gameId={Number(gameId)} />;
}
