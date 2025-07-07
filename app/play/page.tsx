"use client";
import React, { Suspense, useEffect } from "react";
import PlayingBoard from "../components/board/playingBoard";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";

function GameBoard() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  useEffect(() => {
    if (gameId) {
      fetch(`/cookies?gameId=${gameId}`, {
        method: "GET",
      });
    }
  }, [gameId]);

  if (!gameId) {
    return <div>No gameId</div>;
  }

  return <PlayingBoard gameId={Number(gameId)} />;
}

export default function Play() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-full min-h-screen">
          <Spinner color="success" title="Loading game..." />
        </div>
      }
    >
      <GameBoard />
    </Suspense>
  );
}
