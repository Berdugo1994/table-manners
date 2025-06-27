import { create } from "zustand";
import { getPlayerLocation } from "../components/board/locations";
import { reOrderPlayers } from "./utils";

export interface Player {
  id: number;
  rowIndex: number;
  columnIndex: number;
  name?: string;
  buyIns: number;
}

interface PlayerStore {
  players: Player[];
  addPlayer: (player: Omit<Player, "id" | "rowIndex" | "columnIndex">) => void;
  updatePlayer: (id: number, updates: Partial<Player>) => void;
  removePlayer: (id: number) => void;
  addBuyIn: (id: number, amount: number) => void;
  removeBuyIn: (id: number, amount: number) => void;
  getPlayer: (id: number) => Player | undefined;
  getPlayersIds: () => number[];
  getPlayersAmount: () => number;
  updatePlayerName: (id: number, name?: string) => void;
  nextPlayerId: () => number;
  getPlayerByPosition: (
    rowIndex: number,
    columnIndex: number
  ) => Player | undefined;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  players: [],

  addPlayer: (player) => {
    const playersAmount = get().getPlayersAmount();
    const newPlayerId = get().nextPlayerId();
    const newPlayerLocation = getPlayerLocation(newPlayerId, playersAmount + 1);

    const newPlayer: Player = {
      ...player,
      id: newPlayerId,
      rowIndex: newPlayerLocation.row,
      columnIndex: newPlayerLocation.column,
    };
    let newPlayers = [...get().players, newPlayer];
    if (newPlayerId === 4) {
      newPlayers = reOrderPlayers(newPlayers);
    }

    set(() => ({
      players: newPlayers,
    }));
  },

  updatePlayer: (id, updates) => {
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

  addBuyIn: (id, amount) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id
          ? { ...player, buyIns: player.buyIns + amount }
          : player
      ),
    }));
  },

  removeBuyIn: (id, amount) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id
          ? { ...player, buyIns: Math.max(0, player.buyIns - amount) }
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
}));
