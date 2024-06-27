import { PhotoFile } from "react-native-vision-camera";
import { create } from "zustand";

type State = {
  isCameraVisible: boolean;
  photo: PhotoFile | null;
};

type Action = {
  setIsCameraVisible: (isCameraVisible: State["isCameraVisible"]) => void;
  setPhoto: (photo: State["photo"]) => void;
};

export const useCameraStore = create<State & Action>((set) => ({
  photo: null,
  setPhoto: (photo) => set(() => ({ photo })),
  isCameraVisible: true,
  setIsCameraVisible: (isCameraVisible) => set(() => ({ isCameraVisible })),
}));
