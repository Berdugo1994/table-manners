import { create } from "zustand";

export interface Board {
  buyIn: number;
  playersAmount: number;
}

interface BoardStore {
  board: Board;
  setBoardBuyin: (buyIn: number) => void;
  setBoardPlayersAmount: (playersAmount: number) => void;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: {
    buyIn: 0,
    playersAmount: 0,
  },

  setBoardBuyin: (buyIn: number) => {
    set((state) => ({
      board: { ...state.board, buyIn },
    }));
  },

  setBoardPlayersAmount: (playersAmount: number) => {
    set((state) => ({
      board: { ...state.board, playersAmount },
    }));
  },

  getBoard: () => {
    return get().board;
  },

  getBoardBuyin: () => {
    return get().board.buyIn;
  },

  getBoardPlayersAmount: () => {
    return get().board.playersAmount;
  },
}));
