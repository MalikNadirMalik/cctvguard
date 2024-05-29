import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
    FlatList,
    Alert
} from 'react-native';
import { useNavigation, useNavigationContainerRef } from "@react-navigation/native";
import Video from 'react-native-video';
import SafeAreaView from 'react-native-safe-area-view';



export async function requestUserPermission() {

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
    }
}
const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('oldFcm Token', fcmToken);

    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log('New Fcm Token', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }

        } catch (error) {
            console.log(error)
        }
    }
};

const PushNotification = ({ navigation }) => {

    const navigationContainerRef = useRef();
    console.log("navigation....", navigationContainerRef);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../Assets/MainBackGround.png')}
                    style={styles.ImageBackground}>
                    <Text style={{ fontSize: 24 }}>
                        hello Notification
                    </Text>
                </ImageBackground >

            </View >



        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor:'rgba(7, 7, 20, 0.877) ',
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
    },


});


export default PushNotification;