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
  initPlayers: (players: Player[]) => void;
  createPlayer: (initialCredits: number, name?: string) => void;
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
  initPlayers: (players: Player[]) => {
    set(() => ({
      players,
    }));
  },

  createPlayer: (initialCredits: number, name?: string) => {
    const playersAmount = get().getPlayersAmount();
    const newPlayerId = get().nextPlayerId();
    const newPlayerLocation = getPlayerLocation(newPlayerId, playersAmount + 1);

    const newPlayer: Player = {
      id: newPlayerId,
      rowIndex: newPlayerLocation.row,
      columnIndex: newPlayerLocation.column,
      credits: initialCredits,
      name: name ? name : "Name " + newPlayerId,
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
