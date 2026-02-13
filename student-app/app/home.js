import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { account } from "../lib/appwrite";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); //
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>SOT Attendance Portal</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>Ready for class?</Text>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => router.push("/scanner")} //
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Text style={{ color: "red" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  welcome: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    alignItems: "center",
  },
  cardText: { fontSize: 16, marginBottom: 20 },
  scanButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  logout: { marginTop: 50 },
});
