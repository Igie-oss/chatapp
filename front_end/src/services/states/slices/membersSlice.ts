import { StateCreator } from "zustand";


export type TMembersSlice = {
  members: TMembers[];
  seTMembers: (members: TMembers[]) => void;
  removeMembers: () => void;
};
export const createMembersSlice: StateCreator<TMembersSlice> = (set) => ({
  members: [{ userId: "", userName: "", isAdmin: false }],
  seTMembers: (members: TMembers[]) => {
    set({ members: members });
  },
  removeMembers: () => set({ members: [] }),
});
