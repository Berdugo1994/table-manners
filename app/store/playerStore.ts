import { create } from "zustand";
import { getPlayerLocation } from "../components/board/locations";
import { reOrderPlayers } from "./utils";

export interface Player {
  id: number;
  rowIndex: number;
  columnIndex: number;
  name: string;
  credits: number;
}

interface PlayerStore {
  players: Player[];
  addPlayer: (initialCredits: number) => void;
  updatePlayer: (id: number, updates: Partial<Player>) => void;
  removePlayer: (id: number) => void;
  addCredits: (id: number, amount: number) => void;
  getPlayer: (id: number) => Player | undefined;
  getPlayersIds: () => number[];
  getPlayersAmount: () => number;
  updatePlayerName: (id: number, name?: string) => void;
  nextPlayerId: () => number;
  getPlayerByPosition: (
    rowIndex: number,
    columnIndex: number
  ) => Player | undefined;
  getAllCredits: () => number;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  players: [],
  // players: [
  //   {
  //     name: "Name0",
  //     buyIns: 0,
  //     id: 0,
  //     rowIndex: 1,
  //     columnIndex: 3,
  //   },
  //   {
  //     name: "Name1",
  //     buyIns: 0,
  //     id: 1,
  //     rowIndex: 6,
  //     columnIndex: 5,
  //   },
  //   {
  //     name: "Name2",
  //     buyIns: 0,
  //     id: 2,
  //     rowIndex: 11,
  //     columnIndex: 3,
  //   },
  //   {
  //     name: "Name3",
  //     buyIns: 0,
  //     id: 3,
  //     rowIndex: 6,
  //     columnIndex: 1,
  //   },
  // ],

  addPlayer: (initialCredits: number) => {
    const playersAmount = get().getPlayersAmount();
    const newPlayerId = get().nextPlayerId();
    const newPlayerLocation = getPlayerLocation(newPlayerId, playersAmount + 1);

    const newPlayer: Player = {
      id: newPlayerId,
      rowIndex: newPlayerLocation.row,
      columnIndex: newPlayerLocation.column,
      credits: initialCredits,
      name: "Name " + newPlayerId,
    };
    let newPlayers = [...get().players, newPlayer];
    if (newPlayerId >= 4) {
      newPlayers = reOrderPlayers(newPlayers, newPlayerId - 4, newPlayerId);
    }

    set(() => ({
      players: newPlayers,
    }));
  },

  updatePlayer: (id, updates) => {
    console.log("updatePlayer", id, updates);
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id ? { ...player, ...updates } : player
      ),
    }));
  },

  removePlayer: (id) => {
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    }));
  },

  addCredits: (id, amount) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id
          ? { ...player, credits: player.credits + amount }
          : player
      ),
    }));
  },

  getPlayersAmount: () => {
    return get().players.length;
  },

  getPlayer: (id) => {
    return get().players.find((player) => player.id === id);
  },
  getPlayersIds: () => {
    return get().players.map((player) => player.id);
  },

  getPlayerByPosition: (rowIndex, columnIndex) => {
    return get().players.find(
      (player) =>
        player.rowIndex === rowIndex && player.columnIndex === columnIndex
    );
  },

  updatePlayerName: (id, name?: string) => {
    name = name ? name : "Name" + id;
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id ? { ...player, name } : player
      ),
    }));
  },

  nextPlayerId: () => {
    return get().getPlayersAmount();
  },

  getAllCredits: () => {
    return get().players.reduce((acc, player) => acc + player.credits, 0);
  },
}));
