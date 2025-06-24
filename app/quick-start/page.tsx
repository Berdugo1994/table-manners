"use client";
import React from "react";
import QuickStartForm from "../components/quick-start-form";
import Board from "../components/board/board";

export default function QuickStart() {
  const [numPlayers, setNumPlayers] = React.useState(4);
  const [buyIn, setBuyIn] = React.useState(10);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Quick Start</h1>
      <QuickStartForm
        numPlayers={numPlayers}
        setNumPlayers={setNumPlayers}
        buyIn={buyIn}
        setBuyIn={setBuyIn}
      />
      <Board playersAmount={numPlayers} />
    </div>
  );
}
