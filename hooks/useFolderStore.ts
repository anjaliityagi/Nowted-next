// import { set } from "react-hook-form";
import { persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

type folderStore = {
  folderName: string;
  setFolderName: (state: string) => void;
};
const store: StateCreator<folderStore> = (set) => ({
  folderName: "",
  setFolderName: (state) =>
    set({
      folderName: state,
    }),
});

const useFolderStore = create<folderStore>()(
  persist(store, {
    name: "folderStorage",
  }),
);

export default useFolderStore;
