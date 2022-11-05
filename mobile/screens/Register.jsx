import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import React from 'react'

const Register = () => {
  return (
    <SafeAreaView style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Create an account.</Text>
        </View>
        
        <TextInput
            style={styles.input}
            placeholder="Username"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
        />


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
    }
});