import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { account, ID } from "../lib/appwrite";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter(); //

  const handleSignup = async () => {
    const sotDomain = "sot.pdpu.ac.in";

    if (!email.toLowerCase().endsWith(sotDomain)) {
      Alert.alert(
        "Access Denied",
        "This app is currently restricted to SOT students only. Please use your @sot.pdpu.ac.in email.",
      );
      return;
    }

    try {
      // Create the user in Appwrite
      await account.create(ID.unique(), email, password, name);

      // After creating the account, we'll want to save their 'role' in the database
      // But for now, let's just get them to the login screen
      Alert.alert("Success", "SOT Student Account created!");
      router.replace("/");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="College Email (@pdeu.ac.in)"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
