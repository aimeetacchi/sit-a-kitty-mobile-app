import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const [bio, setBio] = useState("");
  const [isSitter, setIsSitter] = useState(false);
  const [loading, setLoading] = useState(false);

  const uid = user?.uid;

  useEffect(() => {
    const loadProfile = async () => {
      if (!uid) return;
      setLoading(true);
      try {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as { bio?: string; isSitter?: boolean };
          if (data.bio) setBio(data.bio);
          if (typeof data.isSitter === "boolean") setIsSitter(data.isSitter);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [uid]);

  const handleSave = async () => {
    if (!uid) return;
    setLoading(true);
    try {
      const ref = doc(db, "users", uid);
      await setDoc(
        ref,
        {
          bio,
          isSitter,
          displayName: user?.displayName ?? "",
          email: user?.email ?? "",
        },
        { merge: true }
      );
      Alert.alert("Profile saved", "Your cat sitter profile has been updated.");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>{user?.displayName ?? "Unknown"}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user?.email ?? "-"}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Are you a sitter?</Text>
        <Switch value={isSitter} onValueChange={setIsSitter} />
      </View>

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        multiline
        value={bio}
        onChangeText={setBio}
        placeholder="Tell us about your kitty-sitting experience..."
      />

      <Button
        title={loading ? "Saving..." : "Save Profile"}
        onPress={handleSave}
        disabled={loading}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  label: { fontWeight: "bold", marginTop: 16, marginBottom: 4 },
  value: { marginBottom: 8, fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 24,
  },
});
