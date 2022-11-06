import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { ButtonStyles } from '../styles/ButtonStyles';
import { ContainerStyles } from '../styles/ContainerStyles';
import { useAuth } from '../hooks/useAuth';
import MainView from './MainView';

const Home = () => {
    const authenticated = useAuth();
    const navigation = useNavigation();
    
    if (authenticated) {
      return <MainView />
    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to GreenBoard.</Text>
    
          <Text style={styles.description}>
            To get started, create an account on our platform.
          </Text>
          <View style={{ ...styles.row, ...ContainerStyles.spaced }}>
            <Pressable style={ButtonStyles.button} 
                onPress={() => navigation.navigate('Register')}
            >
              <Text style={ButtonStyles.buttonText}>Sign Up</Text>
            </Pressable>
            <Pressable style={ButtonStyles.button}
             onPress={() => navigation.navigate('Login')}
            >
              <Text style={ButtonStyles.buttonText}>Sign In</Text>
            </Pressable>
          </View>
          <StatusBar style="dark" />
        </View>
      );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#27ae60",
      alignItems: "center",
      justifyContent: "center",
    },
    description: {
      color: "#fff",
      fontSize: 14,
      textAlign: "center",
      letterSpacing: -0.5,
    },
    // A title style
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
    // A button style
    button: {
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 10,
      paddingHorizontal: 20,
      margin: 2,
    },
    // A button text style
    buttonText: {
      color: "#27ae60",
      fontSize: 14,
      fontWeight: "bold",
    },
    // A row style
    row: {
      flexDirection: "row",
    },
    // A logo container style
    logoContainer: {
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 5,
    },
    // A logo style
    logo: {
      width: 100,
      height: 100,
    },
  });
  