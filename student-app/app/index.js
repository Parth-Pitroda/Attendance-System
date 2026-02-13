import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { account } from "../lib/appwrite"; // Ensure this matches your path

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get(); // If this succeeds, a session exists
        router.replace("/home"); // Send to home automatically
      } catch (error) {
        // No active session, stay on login page
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      // 2. Clear any "ghost" sessions before trying to log in again
      try {
        await account.deleteSession("current");
      } catch (e) {
        // No session to delete, that's fine
      }

      await account.createEmailPasswordSession(email, password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOT Attendance</Text>
      <Text style={styles.subtitle}>Student Portal Login</Text>

      <TextInput
        style={styles.input}
        placeholder="College Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/signup" style={styles.link}>
        <Text style={{ color: "#007AFF" }}>
          New SOT Student? Create Account
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  input: {
    height: 55,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  link: { marginTop: 25, textAlign: "center" },
});
