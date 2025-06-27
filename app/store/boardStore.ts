import { create } from "zustand";

export interface Board {
  lastRebuy: number;
  playersAmount: number;
}

interface BoardStore {
  board: Board;
  setLastRebuy: (buyIn: number) => void;
  getLastRebuy: () => number;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: {
    lastRebuy: 40,
    playersAmount: 0,
  },

  setLastRebuy: (buyIn: number) => {
    set((state) => ({
      board: { ...state.board, lastRebuy: buyIn },
    }));
  },

  getLastRebuy: () => {
    return get().board.lastRebuy;
  },
}));
