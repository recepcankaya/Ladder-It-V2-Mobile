import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const screenDiagonal = Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2));

const designWidth = 430;
const designHeight = 932;
const designDiagonal = 1026.413;

export const widthConstant = screenWidth / designWidth;
export const heightConstant = screenHeight / designHeight;
export const radiusConstant = screenDiagonal / designDiagonal;