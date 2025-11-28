import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID = "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com";

const LoginScreen: React.FC = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        if (!id_token) return;

        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
      }
    };

    signInWithGoogle();
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sit a Kitty 🐱</Text>
      <Text style={styles.subtitle}>
        Find trusted cat sitters or offer your kitty-sitting skills to others.
      </Text>

      <Button
        title="Continue with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    color: "#555",
  },
});
