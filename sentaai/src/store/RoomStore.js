import { create } from "zustand";

export const useRoomStore = create((set) => ({
  room: null,
  setRoom: (room) => set({ room }),
}));
