import { create } from "zustand";
import { Assessment } from "@/types/app";

interface SupervisionStore {
    selectedItems: string[];
    toggleItem: (id: string) => void;
    isSelected: (id: string) => boolean;
    clearSelected: () => void;
    hasSelected: () => boolean;
    toggleAll: (ids: string[]) => void;
}

export const useSupervisionStore = create<SupervisionStore>((set, get) => ({
    selectedItems: [],
    toggleItem: (id: string) => {
        set((state) => ({
            selectedItems: state.selectedItems.includes(id)
                ? state.selectedItems.filter((item) => item !== id)
                : [...state.selectedItems, id],
        }));
    },
    isSelected: (id: string) => get().selectedItems.includes(id),
    clearSelected: () => set({ selectedItems: [] }),
    hasSelected: () => get().selectedItems.length > 0,
    toggleAll: (ids: string[]) => {
        const allSelected = ids.every((id) => get().selectedItems.includes(id));
        set({ selectedItems: allSelected ? [] : ids });
    },
}));
