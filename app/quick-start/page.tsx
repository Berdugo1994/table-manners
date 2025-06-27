"use client";
import React from "react";
import QuickStartForm from "../components/quick-start-form";
import Board from "../components/board/board";
import GameStats from "../components/GameStats";

export default function QuickStart() {
  const [numPlayers, setNumPlayers] = React.useState(4);
  const [buyIn, setBuyIn] = React.useState(10);
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
