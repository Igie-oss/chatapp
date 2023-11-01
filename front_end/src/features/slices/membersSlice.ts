import { StateCreator } from "zustand";

type TMembers = {
  userId: string;
  userName: string;
};
export type TMembersSlice = {
  members: TMembers[];
  seTMembers: (members: TMembers[]) => void;
  removeMembers: () => void;
};
export const createMembersSlice: StateCreator<TMembersSlice> = (set) => ({
  members: [{ userId: "", userName: "" }],
  seTMembers: (members: TMembers[]) => {
    set({ members: members });
  },
  removeMembers: () => set({ members: [] }),
});
