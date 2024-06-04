import { create } from "zustand";

const COMMUTING_MODES = ["driving", "driving-traffic", "walking", "cycling"];

const useIsochroneForm = create((set) => ({
  zipCode: 92707,
}));
