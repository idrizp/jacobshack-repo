import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

export default function App() {
  const Stack = createNativeStackNavigator();
  const routes = [
    { name: "Home", component: Home },
    { name: "Register", component: Register },
    { name: "Login", component: Login },
  ];

  return (
    // Hide the navigation container's status bar
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
