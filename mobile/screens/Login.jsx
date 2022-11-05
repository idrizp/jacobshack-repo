import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import { ContainerStyles } from '../styles/ContainerStyles';
import { ButtonStyles } from '../styles/ButtonStyles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Register = () => {
  return (
    <SafeAreaView style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Sign into your account.</Text>
        </View>

        <View style={
            {
                ...ContainerStyles.spaced, 
                ...ContainerStyles.centered,
                ...ContainerStyles.full,
            }
        }>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            <Pressable>
                <View style={{...ButtonStyles.button, ...ContainerStyles.spaced}}>
                    <Text style={ButtonStyles.buttonText}>Log In</Text>
                </View>
            </Pressable>
        </View>

    </SafeAreaView>
  )
}

export default Register;

// define style
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#27ae60",
    },
    container: {
        paddingTop: 50,
        paddingLeft: 20,
        borderTopLeftRadius: 30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 32,
        color: "#fff",
        letterSpacing: -0.5,
    },
    input: {
        backgroundColor: "#fff",
        marginVertical: 2,
        width: "75%",
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 20,
    },
    label: {
        color: "#fff",
        fontSize: 20,
        textAlign: "left",
        width: "75%",
        marginBottom: 5, 
        marginTop: 10,       
        letterSpacing: -0.5,
    },
});