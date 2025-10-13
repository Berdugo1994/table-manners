import { getNextGameId } from "@/app/api/game_db_utils";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export const Counter = () => {
  const [amountOfBoards, setAmountOfBoards] = useState(0);
  useEffect(() => {
    getNextGameId().then((amount) => {
      setAmountOfBoards(amount);
    });
  }, []);
  return (
    <div className="text-md flex flex-col justify-center items-center">
      <CountUp
        startOnMount={false}
        end={amountOfBoards}
        duration={5}
        className="text-4xl font-bold"
      />
      <div>Boards already created!</div>
      <div>What are you waiting for?</div>
    </div>
  );
};
