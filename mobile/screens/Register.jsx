import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ContainerStyles } from '../styles/ContainerStyles';
import { ButtonStyles } from '../styles/ButtonStyles';
import {  } from '../api/request';
import { register } from '../api/authentication';
import { useNavigation } from '@react-navigation/native';
import { ColorStyles } from '../styles/ColorStyles';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const [success, setSuccess] = useState(undefined);
  return (
    <SafeAreaView style={styles.background}>

        <View style={
            {
                ...ContainerStyles.spaced, 
                ...ContainerStyles.centered,
                ...ContainerStyles.full,
            }
        }>
            <View style={styles.container}>
                <Text style={styles.title}>Create an account.</Text>
            </View>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                autoCapitalize='none'
                onChangeText={text => setUsername(text)}
                autoCorrect={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Pressable onPress={() => {
                if (username === "" && password === "") {
                    return;
                }
                // Register the user with the API
                register(username, password).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setSuccess(true);
                        navigation.navigate('Home');
                    }
                }).catch(error => {
                    if (error.response.status === 409) {
                        setSuccess(false);
                    }
                });
            }}>
                <View style={{...ButtonStyles.button, ...ContainerStyles.spaced}}>
                    <Text style={ButtonStyles.buttonText}>Sign Up</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <View style={{...ButtonStyles.button}}>
                    <Text style={ButtonStyles.buttonText}>Already have an account?</Text>
                </View>
            </Pressable>

            { success === false && 
            <Text style={ColorStyles.error}>
                Username already exists.
            </Text>
            }
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