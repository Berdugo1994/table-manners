"use client";
import React from "react";
import Board from "../components/board/board";

export default function QuickStart() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* <QuickStartForm
        numPlayers={numPlayers}
        setNumPlayers={setNumPlayers}
        buyIn={buyIn}
        setBuyIn={setBuyIn}
        // addCandidatePlayer={addCandidatePlayer}
      /> */}
      <div className="flex gap-4 items-start">
        <Board />
        {/* <GameStats /> */}
      </div>
    </div>
  );
}
