import { StateCreator } from "zustand";

type TUser = {
  userId: string;
  userName: string;
};
export type TUserSlice = {
  user: TUser;
  setUser: (user: TUser) => void;
  removeUser: () => void;
};

const initialUser: TUser = {
  userId: "",
  userName: "",
};
export const createUserSlice: StateCreator<TUserSlice> = (set) => ({
  user: initialUser,
  setUser: (userData: TUser) => set({ user: userData }),
  removeUser: () => set({ user: initialUser }),
});
