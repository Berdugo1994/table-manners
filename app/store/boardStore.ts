import { create } from "zustand";

export interface Board {
  buyIn: number | null;
  lastRebuy: number;
  playersAmount: number;
  ratio: number | null;
  gameName: string;
  isBoardInitialized: boolean;
  gameId: number | null;
}

interface BoardStore {
  board: Board;
  getLastRebuy: () => number;
  setLastRebuy: (lastRebuy: number) => void;
  setRatio: (ratio: number) => void;
  getRatio: () => number | null;
  initBoard: (
    gameId: number,
    gameName: string,
    ratio: number,
    buyIn: number
  ) => void;
  getBuyIn: () => number | null;
  getGameName: () => string;
  isBoardInitialized: () => boolean;
  getGameId: () => number | null;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: {
    buyIn: null,
    lastRebuy: 40,
    playersAmount: 0,
    ratio: null,
    gameName: "",
    isBoardInitialized: false,
    gameId: null,
  },

  setLastRebuy: (lastRebuy: number) => {
    set((state) => ({
      board: { ...state.board, lastRebuy },
    }));
  },

  getLastRebuy: () => {
    return get().board.lastRebuy;
  },

  setRatio: (ratio: number) => {
    set((state) => ({
      board: { ...state.board, ratio },
    }));
  },

  getRatio: () => {
    return get().board.ratio;
  },

  initBoard: (
    gameId: number,
    gameName: string,
    ratio: number,
    buyIn: number
  ) => {
    set((state) => ({
      board: {
        ...state.board,
        gameId,
        buyIn,
        ratio,
        gameName,
        isBoardInitialized: true,
      },
    }));
  },

  getBuyIn: () => {
    return get().board.buyIn;
  },

  getGameName: () => {
    return get().board.gameName;
  },

  isBoardInitialized: () => {
    return get().board.isBoardInitialized;
  },

  getGameId: () => {
    return get().board.gameId;
  },
}));
