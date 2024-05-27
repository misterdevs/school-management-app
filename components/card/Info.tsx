import { CardColors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export function Info({ icon, text }: any) {
  const color = useThemeColor(
    { light: CardColors.color.light, dark: CardColors.color.dark },
    "text"
  );
  return (
    <View style={styles.infoCard}>
      <Ionicons name={icon} size={10} style={{ color }} />
      <Text style={[{ color }, styles.textInfoCard]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  textInfoCard: {
    fontSize: 12,
  },
});
