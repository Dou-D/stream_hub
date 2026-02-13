import { create } from "zustand";

interface UIState {
  isAuthOpen: boolean;
  setAuthModalState: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAuthOpen: false,
  setAuthModalState: (isOpen: boolean) => set({ isAuthOpen: isOpen }),
}));
