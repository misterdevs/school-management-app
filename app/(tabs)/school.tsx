import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { province, regency, staticProvince } from "@/constants/Input";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { getSchools } from "@/api";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Info } from "@/components/card/Info";
import { Container } from "@/components/card/Container";
import { CardColors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function SchoolScreen() {
  const [schools, setSchools] = useState<Array<any>>([]);
  const color = useThemeColor(
    { light: CardColors.color.light, dark: CardColors.color.dark },
    "text"
  );
  const isFocused = useIsFocused();

  const getSchool = async () => {
    await getSchools()
      .then((res) => {
        setSchools(res);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (isFocused) {
      getSchool();
    }
  }, [isFocused]);
  useEffect(() => {
    getSchool();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Registered School!</ThemedText>
      </ThemedView>
      {schools?.map((school) => {
        return (
          <Link
            key={school.id}
            href={{
              pathname: "../detail/[id]",
              params: { id: school.id },
            }}
          >
            <Container>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <View>
                  <View style={styles.titleCard}>
                    <Text style={[{ color }, styles.titleCard]}>
                      {school.schoolName}
                    </Text>
                    <View style={styles.badgeCard}>
                      <Text style={[{ color }, styles.titleBadge]}>
                        {school.schoolType}
                      </Text>
                    </View>
                  </View>
                  <Text style={[{ color }, styles.subtitleCard]}>
                    {school.regency}, {school.province}
                  </Text>
                </View>
                <View style={styles.titleCard}>
                  <Info icon="call-outline" text={school.schoolPhone} />
                  <Info icon="mail-outline" text={school.schoolEmail} />
                </View>
              </View>
              <Info icon="person-outline" text={school.totalStudents} />
            </Container>
          </Link>
        );
      })}
      <ThemedView style={styles.innerContainer}></ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  innerContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    margin: 20,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  titleCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitleCard: {
    fontSize: 12,
  },
  infoCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  textInfoCard: {
    fontSize: 12,
  },
  badgeCard: {
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "rgba(0, 114, 255, 0.51)",
  },
  titleBadge: {
    fontSize: 10,
    color: "white",
  },
});
