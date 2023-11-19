import { create } from "zustand";
import { createAuthSlice, TAuthSlice } from "./slices/authSlice";
import { createUserSlice, TUserSlice } from "./slices/userSlice";
import { createMembersSlice, TMembersSlice } from "./slices/membersSlice";
type combinedSlice = TAuthSlice & TUserSlice & TMembersSlice;

export const useAppStore = create<combinedSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUserSlice(...a),
  ...createMembersSlice(...a),
}));
