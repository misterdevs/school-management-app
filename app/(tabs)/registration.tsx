import { Alert, Button, Image, StyleSheet, TextInput } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { province, regency, staticProvince } from "@/constants/Input";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { createSchool, getSchools } from "@/api";

export default function RegistrationScreen() {
  const [schoolType, setSchoolType] = useState<string>("Negeri");
  const [schoolName, setSchoolName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [studentCount, setStudentCount] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [regency, setRegency] = useState<string>("");

  const [regencies, setRegencies] = useState<Array<regency>>([]);
  const [provinces, setProvinces] = useState<Array<province>>(staticProvince);
  const color = useThemeColor({ light: "#000", dark: "#fff" }, "text");

  function findProvinceNameById(id: string) {
    return provinces.filter((prov) => prov.id == id)[0].name;
  }
  function findRegencyNameById(id: string) {
    return regencies.filter((reg) => reg.id == id)[0].name;
  }

  const handleSubmit = async () => {
    if (
      !schoolName ||
      !address ||
      !postalCode ||
      !phoneNumber ||
      !email ||
      !studentCount
    ) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }
    if (!/^\d{5}$/.test(postalCode)) {
      Alert.alert("Error", "Postal code must be 5 digits");
      return;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      Alert.alert("Error", "Phone number must be numeric");
      return;
    }
    if (
      !/^\d+$/.test(studentCount) ||
      Number(studentCount) < 1 ||
      Number(studentCount) > 100
    ) {
      Alert.alert("Error", "Student count must be a number between 1 and 100");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }
    const handleAddSchool = async () => {
      await createSchool({
        schoolType: schoolType,
        schoolName: schoolName,
        address: address,
        postalCode: postalCode,
        province: findProvinceNameById(province),
        regency: findRegencyNameById(regency),
        schoolPhone: phoneNumber,
        schoolEmail: email,
        facebook: facebook,
        totalStudents: Number(studentCount),
      })
        .then(() =>
          Alert.alert("Registration", "School registered successfully")
        )
        .catch((err) => {
          Alert.alert("Registration", "School failed to register");
          console.error("submitSchool", err);
        });
    };
    handleAddSchool();
  };
  // const getProvinces = () => {
  //   fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
  //     .then((response) => response.json())
  //     .then((provinces: Array<province>) => {
  //       setProvinces(provinces);
  //       setProvince(provinces[0]?.id);
  //     })
  //     .catch((err) => console.error(err));
  // };
  const getregency = (province_id: string) => {
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province_id}.json`
    )
      .then((response) => response.json())
      .then((regencies: Array<regency>) => {
        setRegencies(regencies);
        setRegency(regencies[0]?.id);
      })
      .catch((err) => console.error("test", err));
  };
  useEffect(() => {
    if (province) {
      getregency(province);
    }
  }, [province]);
  useEffect(() => {
    setProvince(provinces[0]?.id);
    // getProvinces();
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
        <ThemedText type="title">School Registration!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.innerContainer}>
        <ThemedText type="defaultSemiBold">School Type:*</ThemedText>
        <Picker
          selectedValue={schoolType}
          style={styles.inputDropdown}
          onValueChange={(itemValue: string) => setSchoolType(itemValue)}
        >
          <Picker.Item label="Negeri" value="Negeri" />
          <Picker.Item label="Swasta" value="Swasta" />
        </Picker>

        <ThemedText type="defaultSemiBold">School Name:*</ThemedText>
        <TextInput
          style={[{ color }, styles.input]}
          value={schoolName}
          onChangeText={setSchoolName}
          placeholder="Enter school name"
        />

        <ThemedText type="defaultSemiBold">Address:*</ThemedText>
        <TextInput
          style={[{ color }, styles.input]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
        />

        <ThemedText type="defaultSemiBold">Postal Code:*</ThemedText>
        <TextInput
          style={[{ color }, styles.input]}
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="Enter postal code"
          keyboardType="numeric"
          maxLength={5}
        />

        <ThemedText type="defaultSemiBold">Province:*</ThemedText>
        <Picker
          selectedValue={province}
          style={styles.inputDropdown}
          onValueChange={(itemValue: string) => setProvince(itemValue)}
        >
          {provinces.map((prov: province) => {
            return (
              <Picker.Item key={prov.id} label={prov.name} value={prov.id} />
            );
          })}
        </Picker>
        <ThemedText type="defaultSemiBold">Regency:*</ThemedText>
        <Picker
          selectedValue={regency}
          style={styles.inputDropdown}
          onValueChange={(itemValue: string) => setRegency(itemValue)}
        >
          {regencies.map((regency: regency) => {
            return (
              <Picker.Item
                key={regency.id}
                label={regency.name}
                value={regency.id}
              />
            );
          })}
        </Picker>

        <ThemedText type="defaultSemiBold">Phone Number:*</ThemedText>
        <TextInput
          style={[{ color }, styles.input]}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <ThemedText type="defaultSemiBold">Email Sekolah:*</ThemedText>
        <TextInput
          style={[{ color }, styles.input]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />
        <ThemedText type="defaultSemiBold">Facebook:</ThemedText>
        <TextInput
          style={[{ color }, styles.input]}
          value={facebook}
          onChangeText={setFacebook}
          placeholder="Enter facebook"
        />

        <ThemedText type="defaultSemiBold">Total Students:*</ThemedText>
        <TextInput
          style={[{ color }, styles.input]}
          value={studentCount}
          onChangeText={setStudentCount}
          placeholder="Enter total students"
          keyboardType="numeric"
        />

        <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  inputDropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});
