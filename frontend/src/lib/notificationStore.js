import { create } from "zustand";
import axios from "axios";
export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await axios("/users/notification");
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
