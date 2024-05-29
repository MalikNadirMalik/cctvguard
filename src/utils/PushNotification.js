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

// export async function NotificationServices() {
//     const navigation = useNavigation();
//     //onNotificationOpenedApp: When the application is running, but in the background.
//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log("navigation1", navigation);
//         console.log('Notifivation caused app open from background state in the Notification component ',
//             remoteMessage)
//         console.log("navigation1", navigation);
//         // navigation.navigate('WatchPrediction');

//     });
//     //forGround Message
//     messaging().onMessage(async remoteMessage => {
//         console.log("navigation2", navigation);

//         console.log('Notification caused app open from foreground state in the Notification component',
//             remoteMessage);
//         // const { CameraPrediction } = remoteMessage.data;
//         // navigation.navigate('WatchPrediction');
//         // navigationRef.current?.navigate(CameraPrediction);

//     });

//     //getInitialNotification: When the application is opened from a quit state.
//     messaging().
//         getInitialNotification()
//         .then(remoteMessage => {
//             console.log("navigation3", navigation);
//             if (remoteMessage) {
//                 console.log("Notifivation caused app open from quit state in the Notification component",
//                     remoteMessage);
//             }

//             // navigation.navigate('WatchPrediction');
//         });

//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//         console.log('Message handled in the background in the PushNotification page!', remoteMessage);
//     });
// }

const PushNotification = ({ navigation }) => {
    
    const navigationContainerRef = useRef();
    // const navigation = useNavigation();
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