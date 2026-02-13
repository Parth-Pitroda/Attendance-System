import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { account, databases, ID } from "../lib/appwrite";
import { getDistance } from "../lib/utils";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Your Current Test Coordinates
  const classroomLocation = { latitude: 23.155904, longitude: 72.664472 };

  const saveAttendanceRecord = async (courseId, studentLocation) => {
    try {
      const user = await account.get();

      const attendanceData = {
        "student-id": user.email,
        "course-id": courseId,
        timestamp: new Date().toISOString(),
        "location-verified": true,
        "student-lat": studentLocation.latitude,
        "student-lon": studentLocation.longitude,
      };

      await databases.createDocument(
        "6981930d001d39384a47", // Database ID
        "69819372001ebb4f7678", // Collection ID
        ID.unique(),
        attendanceData,
      );

      Alert.alert("Success", "Attendance officially recorded!");
    } catch (error) {
      Alert.alert("Database Error", error.message);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          We need your camera to scan the QR code.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location is required for SOT attendance.",
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const distance = getDistance(
      location.coords.latitude,
      location.coords.longitude,
      classroomLocation.latitude,
      classroomLocation.longitude,
    );

    if (distance <= 50) {
      const courseIdFromQR = data.split("-")[0];
      await saveAttendanceRecord(courseIdFromQR, location.coords);
    } else {
      Alert.alert(
        "Too Far",
        `You are ${Math.round(distance)}m away from the classroom.`,
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanAgain}>
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#000" },
  scanAgain: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
  },
});
