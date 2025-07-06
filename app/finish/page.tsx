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
// import { Expense } from "../types/expense";
// import AddExpenseModal from "../components/expenseModal/expenseModal";

function GameResults() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const gameIdNumber = Number(gameId);
  const [game, setGame] = useState<FinalPlayer[] | null>(null);
  const sortedPlayers = sortPlayerResults(game ?? []);
  // const [expenses, setExpenses] = useState<Expense[]>([]);
  // const [addExpenseModal, setAddExpenseModal] = useState<boolean>(false);

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

  return (
    <div className="flex flex-col gap-4">
      <Results players={sortedPlayers} />
      <Podium players={sortedPlayers} />
      <Settle players={sortedPlayers} />
    </div>
  );
}

export default function Finish() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[100vh]">
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
