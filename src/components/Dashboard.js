import 'react-native-gesture-handler'
import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import StackNavigation from '../navigation/StackNavigation';
import NotificationHandler from '../utils/NotificationHandler';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
const Dashboard = () => {

    // const navigationContainerRef = useRef();
    // console.log("navigation....", navigationContainerRef);

    // console.log("navigation.........", navigation)
    useEffect(() => {
        // const unsubscribe = messaging().onMessage(async remoteMessage => {
        //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // });

        // messaging().setBackgroundMessageHandler(async remoteMessage => {
        //     console.log("message handle at the background ", remoteMessage)
        // });

        // messaging().onNotificationOpenedApp(async remoteMessage => {
        //     console.log("Notification caused app open from quit state at openapp", remoteMessage.notification);
        //     let data = remoteMessage.notification;
        //     console.log("data ........ ", data);
        //     let myJSONData = JSON.stringify(data);
        //     console.log("myJSONData.......", myJSONData);
        //     // await AsyncStorage.setItem("data", data);
        //     await AsyncStorage.setItem('data', myJSONData);
        //     // navigation.navigate("NotificationHandler");

        // });

        // messaging().getInitialNotification()
        //     .then(async remoteMessage => {
        //         if (remoteMessage) {
        //             console.log("Notification caused app open from quit state", remoteMessage.notification);
        //             let data = remoteMessage.notification;
        //             console.log("data ", data);
        //             let myJSONData = JSON.stringify(data);

        //             console.log("data.......", myJSONData);

        //             await AsyncStorage.setItem("data", myJSONData);

        //             navigation.navigate("NotificationHandler");
        //         }

        //     });


        // return unsubscribe;

    }, []);


    return (


        <StackNavigation />


    )
}



export default Dashboard;