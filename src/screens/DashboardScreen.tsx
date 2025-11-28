import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();

  const displayName = user?.displayName ?? "Cat lover";

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi {displayName} 😺</Text>
      <Text style={styles.text}>
        Welcome to Sit a Kitty. View or edit your profile, and start sitting or
        finding sitters for your kitty.
      </Text>

      <View style={styles.buttons}>
        <Button
          title="View / Edit Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>

      <View style={styles.signOut}>
        <Button title="Sign Out" onPress={() => auth.signOut()} />
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  greeting: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 16, marginBottom: 24, color: "#555" },
  buttons: { marginBottom: 16 },
  signOut: { marginTop: "auto" },
});
