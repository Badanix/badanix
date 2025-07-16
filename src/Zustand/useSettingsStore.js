import { create } from "zustand";

const useSettingsStore = create((set) => ({
    isEditingProfile: false,
    isEditingPersonalInfo: false,
    isEditingAddress: false,
    toggleEditing: (section) =>
      set((state) => ({
        [`isEditing${section}`]: !state[`isEditing${section}`],
      })),
  }));
  