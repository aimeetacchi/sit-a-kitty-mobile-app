import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID =
	"1003721849032-m3g8ki0ob37di2jta6qvot19duo59fv8.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
	"1003721849032-jcpfdpj8d6g5t2hm12ma8h5o2qu33ck0.apps.googleusercontent.com";

const redirectUri = AuthSession.makeRedirectUri();
console.log("Expo redirect URI:", redirectUri);

const googleAuthConfig = {
	clientId: WEB_CLIENT_ID,
	andriodClientId: ANDROID_CLIENT_ID,
	redirectUri,
};

GoogleSignin.configure({
	webClientId: WEB_CLIENT_ID,
	scopes: ["https://www.googleapis.com/auth/drive.readonly"],
	offlineAccess: true,
	forceCodeForRefreshToken: false,
	accountName: "",
	// iosClientId: "<FROM DEVELOPER CONSOLE>",
});

const LoginScreen = () => {
	const [request, response, promptAsync] =
		Google.useIdTokenAuthRequest(googleAuthConfig);

	useEffect(() => {
		if (response?.type === "success") {
			const { id_token } = response.params;
			if (!id_token) return;

			const credential = GoogleAuthProvider.credential(id_token);
			signInWithCredential(auth, credential);
		}
	}, [response]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sit a Kitty 🐱</Text>
			<Text style={styles.subtitle}>
				Find trusted cat sitters or offer your kitty-sitting skills to others.
			</Text>

			{/* <Button
				title="Continue with Google"
				onPress={() => promptAsync()}
				disabled={!request}
			/> */}
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
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
