import { create } from "zustand";

export interface Board {
  buyIn: number | null;
  lastRebuy: number;
  playersAmount: number;
  ratio: number | null;
  gameName: string;
}

interface BoardStore {
  board: Board;
  getLastRebuy: () => number;
  setLastRebuy: (lastRebuy: number) => void;
  setRatio: (ratio: number) => void;
  getRatio: () => number | null;
  initBoard: (gameName: string, ratio: number, buyIn: number) => void;
  getBuyIn: () => number | null;
  getGameName: () => string;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: {
    buyIn: null,
    lastRebuy: 40,
    playersAmount: 0,
    ratio: null,
    gameName: "",
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

  initBoard: (gameName: string, ratio: number, buyIn: number) => {
    set((state) => ({
      board: {
        ...state.board,
        buyIn,
        ratio,
        gameName,
      },
    }));
  },

  getBuyIn: () => {
    return get().board.buyIn;
  },

  getGameName: () => {
    return get().board.gameName;
  },
}));
