import { create } from "zustand";
import { AppAlert, AppLoading } from "./types";

interface AppState {
  appAlert: AppAlert;
  setAppAlert: (newAlert: AppAlert) => void;
  appLoading: AppLoading;
  setAppLoading: (newLoading: AppLoading) => void;
  progress: number;
  setProgress: (newProgress: number) => void;
}

const useAppState = create<AppState>((set) => ({
  appAlert: {
    alert: true,
    type: "success",
    msg: "this is success alert",
  },
  setAppAlert: (newAlert) => set({ appAlert: { ...newAlert } }),
  appLoading: {
    load: false,
    color: "#fff",
  },
  setAppLoading: (newLoading) => set({ appLoading: { ...newLoading } }),
  progress: 10,
  setProgress: (newProgress) => set({ progress: newProgress }),
}));

export default useAppState;
