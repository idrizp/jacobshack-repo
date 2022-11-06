import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonStyles } from '../styles/ButtonStyles';
import { StatusBar } from 'expo-status-bar';
import { ContainerStyles } from '../styles/ContainerStyles';
import { TextStyles } from '../styles/TextStyles';
import { sendBarcodeData } from '../api/score';
import { usePoints } from '../hooks/usePoints';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Message = ({ message, children }) => {
    return <View style={{...ContainerStyles.centered, ...ContainerStyles.full}}>
        <Text style={TextStyles.text}>{message}</Text>
        { children }
    </View>
}

const MainView = ({ route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false); 
    const navigation = useNavigation();
    const points = usePoints(route);

    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setProcessing(true);

      sendBarcodeData(data).then(response => {
        setProcessing(false);
        setSuccess(true);
      }).catch(error => {
        setSuccess(false);
        setProcessing(false);
      }).finally(() => {
        setTimeout(() => {
            setScanned(false);
        }, 2000)
      });
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "#27ae60",
      }}>
        <View style={{
            backgroundColor: "#27ae60",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                letterSpacing: -0.5,
                padding: 20,
            }}>GreenBoard.</Text>
        </View>

        { !scanned && <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          barCodeTypes={["aztec", "qr", "codabar"]}
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
        /> }
        {scanned && 
            (processing ? 
               <Message message="Your code is being processed..." />: 

            success ?
                <Message message={`Code successfully redeemed. You now have ${points + 1} points.`}/> 
                :
                <Message message="That code is invalid. Please try again."/>
            )
            }
            <View style={{
                flexDirection: "column",
            }}>
                <Text style={{...TextStyles.text}}>You have {points} points.</Text>
                <Pressable style={{
                    ...ButtonStyles.button,
                }} onPress={() => {
                    navigation.navigate('Leaderboard', {});
                }}>
                    <Text style={ButtonStyles.buttonText}>View Leaderboard</Text>
                </Pressable>
                <Pressable style={{
                    ...ButtonStyles.button,
                }} onPress={() => {
                    AsyncStorage.removeItem("token", () => {
                        navigation.push('Home', {});
                    });
                }}>
                    <Text style={ButtonStyles.buttonText}>Log Out</Text>
                </Pressable>
            </View>
          <StatusBar style="dark" />
      </SafeAreaView>
    );
}

export default MainView;