// stores/useUserStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  
  userImage: null, 
  setUserImage: (image) => set({ userImage: image }), 
}));

export default useUserStore;
