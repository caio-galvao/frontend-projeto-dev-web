import { create } from "zustand";

const useRoomListStore = create((set) => ({
  rooms: [],
  createRoom: (room) =>
    set((state) => ({ rooms: [room, ...state.rooms] })),
  deleteRoom: (id) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== id)
    })),
  setRooms: (rooms) => set({ rooms }),
}));

export default useRoomListStore;
