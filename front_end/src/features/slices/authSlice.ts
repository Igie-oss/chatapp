import { StateCreator } from "zustand";
export type TAuthSlice = {
  token: string;
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
};
export const createAuthSlice: StateCreator<TAuthSlice> = (set) => ({
  token: "",
  setAuthToken: (token: string) => {
    set({ token: token });
  },
  removeAuthToken: () => set({ token: "" }),
});
