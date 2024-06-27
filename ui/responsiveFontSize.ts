import { PixelRatio } from "react-native";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const responsiveFontSize = (size: number) => {
  const scale = width / 430;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
