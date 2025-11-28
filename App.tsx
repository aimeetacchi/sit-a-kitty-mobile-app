import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { ActivityIndicator, View } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: "Sit a Kitty" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Your Profile" }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
