import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Leaderboard from "./screens/Leaderboard";
import Login from "./screens/Login";
import Register from "./screens/Register";

export default function App() {
  const Stack = createNativeStackNavigator();
  const routes = [
    { name: "Home", component: Home },
    { name: "Register", component: Register },
    { name: "Login", component: Login },
    { name: "Leaderboard", component: Leaderboard },
  ];

  return (
    // Hide the navigation container's status bar
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2ecc71",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        {routes.map((route, index) => (
          <Stack.Screen
            key={index}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
