import { create } from "zustand";
import { NAMES } from '../components/Constants'; 

const useWalletStore = create((set) => ({
  walletBalance: NAMES.WALLETBALANCE || 0,
  setWalletBalance: (balance) => set({ walletBalance: balance }),
  addToWalletBalance: (amount) => set((state) => ({ walletBalance: state.walletBalance + amount })),
}));

console.log('Initial Wallet Balance:', useWalletStore.getState().walletBalance); 

export default useWalletStore;
