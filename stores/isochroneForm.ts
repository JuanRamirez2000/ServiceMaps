import { create } from "zustand";

const COMMUTING_MODES = ["driving", "driving-traffic", "walking", "cycling"];

export const useIsochroneState = create((set) => ({
  isochrones: null,
  setIsochrones: (newIsochrones) => set({ isochrones: newIsochrones }),
}));
