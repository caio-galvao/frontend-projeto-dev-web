import { create } from "zustand";

const useBuildingStore = create((set) => ({
  buildings: [],
  createBuilding: (building) =>
    set((state) => ({ buildings: [building, ...state.buildings] })),
  deleteBuilding: (id) =>
    set((state) => ({
      buildings: state.buildings.filter((building) => building.id !== id)
    })),
  setBuildings: (buildings) => set({ buildings }),
}));

export default useBuildingStore;
