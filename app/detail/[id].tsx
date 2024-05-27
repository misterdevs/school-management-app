import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import { school as schoolType } from "@/constants/Type";
import { useEffect, useState } from "react";
import { getSchools } from "@/api";

export default function DetailScreen() {
  const [school, setSchool] = useState<schoolType>();
  // const [schools, setSchools] = useState<Array<schoolType>>();
  const { id } = useLocalSearchParams();
  const getSchool = async () => {
    await getSchools()
      .then((res: Array<schoolType>) => {
        setSchool(res.filter((sch: schoolType) => sch.id == Number(id))[0]);
      })
      .catch((err) => console.error(err));
  };

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
      <Stack.Screen
        options={{
          title: school?.schoolName,
        }}
      />
      <ThemedView style={{ display: "flex", flexDirection: "column" }}>
        <ThemedText type="title">{school?.schoolName}</ThemedText>
        <ThemedText type="default">
          {school?.regency}, {school?.province}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">About</ThemedText>
        <ThemedText type="default">Status: {school?.schoolType}</ThemedText>
        <ThemedText type="default">
          Total Students: {school?.totalStudents}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Contact</ThemedText>
        <ThemedText type="default">
          Facebook: {school?.facebook != "" ? school?.facebook : "-"}
        </ThemedText>
        <ThemedText type="default">Phone: {school?.schoolPhone}</ThemedText>
        <ThemedText type="default">Email: {school?.schoolEmail}</ThemedText>
        <ThemedText type="default">
          Address: {school?.address}. {school?.postalCode}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
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
});
