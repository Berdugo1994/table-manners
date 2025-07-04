"use client";
import { useEffect, useState } from "react";
import { addGame } from "../api/game_db_utils";
import BoardBackground from "../components/board/boardBackground";
import { WelcomeModal } from "../components/welcomeModal/welcomeModal";
import { useBoardStore } from "../store/boardStore";
import { useRouter } from "next/navigation";
import { RotateModal } from "../components/rotateModal/rotateModal";
import { useOrientation } from "@uidotdev/usehooks";

const checkIfHeightIsMoreThanWidth = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  return height > width;
};

export default function SetupPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isRotateModalOpen, setIsRotateModalOpen] = useState(false);
  const { initBoard } = useBoardStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const orientation = useOrientation();

  const onSubmit = (gameName: string, ratio: number, buyIn: number) => {
    setIsLoading(true);
    addGame(gameName, ratio, buyIn).then((response) => {
      setIsLoading(false);
      setIsModalOpen(false);
      if (response.acknowledged && response.gameSerialNumber) {
        initBoard(response.gameSerialNumber, gameName, ratio, buyIn);
        router.push(`/play?gameId=${response.gameSerialNumber}`);
      }
    });
  };

  useEffect(() => {
    console.log("orientation", orientation);
    if (orientation.type === "portrait-primary") {
      setIsRotateModalOpen(true);
    } else {
      setIsRotateModalOpen(false);
    }
  }, [orientation]);

  return (
    <>
      <BoardBackground />
      <RotateModal isModalOpen={isRotateModalOpen} />
      {!isRotateModalOpen && (
        <WelcomeModal
          isModalOpen={isModalOpen}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
