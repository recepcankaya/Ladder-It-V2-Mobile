import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import colors from "./colors";

type Props = {
  text: string;
  style?: StyleProp<TextStyle>;
  fontSize?: number;
};

const CustomText = ({ text, style, fontSize = 20 }: Props) => {
  return (
    <Text style={[styles.text, style, { fontSize: fontSize }]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.grey,
  },
});

export default CustomText;
