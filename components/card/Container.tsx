import { CardColors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

export function Container({ style, ...otherProps }: any) {
  const backgroundColor = useThemeColor(
    {
      light: CardColors.backgroundColor.light,
      dark: CardColors.backgroundColor.dark,
    },
    "text"
  );
  return (
    <View style={[{ backgroundColor }, styles.card, style]} {...otherProps} />
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
