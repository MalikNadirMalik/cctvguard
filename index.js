import { AppRegistry, Linking } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/context/AuthContext';
import { AxiosProvider } from './src/context/AxiosContext';
import React, { useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { Image } from 'react-native';
import PushNotification from 'react-native-push-notification';
import NotificationHandler from './src/utils/NotificationHandler';
import CameraPrediction from './src/screen/DrawBar/CameraPrediction';

// const NAVIGATION_IDS = ['Login', "Signup", 'WatchPrediction'];


// function buildDeepLinkFromNotificationData(data) {
//     console.log("on click data", data);

//     const navigationId = data?.navigationId;
//     if (!NAVIGATION_IDS.includes(navigationId)) {
//         console.warn('Unverified navigationId', navigationId)
//         return null;
//     }
//     if (navigationId === 'signup') {
//         return 'myapp://signup';
//     }

//     if (navigationId === 'WatchPrediction') {

//         return `myapp://WatchPrediction/${data}`;
//     }

//     const chatId = data?.chatId;
//     if (navigationId === 'login') {
//         return `myapp://login/${chatId}`
//     }
//     console.warn('Missing postId')
//     return null
// }


// const linking = {
//     prefixes: ["myapp://"],
//     config: {
//         // initialRouteName: "tabRouts",
//         screens: {
//             login: 'login/:id',
//             signup: 'signup',
//             messages: 'WatchPrediction/:data'
//         },
//     },
//     async getInitialURL() {
//         const url = await Linking.getInitialURL();
//         if (typeof url === 'string') {
//             return url;
//         }
//         //getInitialNotification: When the application is opened from a quit state.
//         const message = await messaging().getInitialNotification();
//         const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
//         if (typeof deeplinkURL === 'string') {
//             return deeplinkURL;
//         }
//     },
//     subscribe(listener) {
//         const onReceiveURL = ({ url }) => listener(url);

//         // Listen to incoming links from deep linking
//         const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

//         //onNotificationOpenedApp: When the application is running, but in the background.
//         const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
//             console.log('Notifivation caused app open from background state in the Index copmonent',
//                 remoteMessage.notification)
//             const url = buildDeepLinkFromNotificationData(remoteMessage.notification)
//             if (typeof url === 'string') {
//                 listener(url)
//             }
//         });

//         //forGround Message
//         messaging().onMessage(async remoteMessage => {
//             console.log('Notification caused app open from foreground state in the Index copmonent',
//                 remoteMessage);
//             const url = buildDeepLinkFromNotificationData(remoteMessage.notification)
//             if (typeof url === 'string') {
//                 listener(url)
//             }
//         });

//         //getInitialNotification: When the application is opened from a quit state.
//         messaging().
//             getInitialNotification()
//             .then(remoteMessage => {
//                 if (remoteMessage) {
//                     console.log("Notifivation caused app open from quit state in the Index copmonent",
//                         remoteMessage.notification);
//                 }
//                 const url = buildDeepLinkFromNotificationData(remoteMessage.notification)
//                 if (typeof url === 'string') {
//                     listener(url)
//                 }
//             });

//         messaging().setBackgroundMessageHandler(async remoteMessage => {
//             console.log('Message handled in the background!', remoteMessage);
//         });

//         return () => {
//             linkingSubscription.remove();
//             unsubscribe();
//         };
//     },
// };

// // Handle background messages using setBackgroundMessageHandler


// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background in the index page!', remoteMessage);
//     if (remoteMessage.notification) {
//         // Display the image
//         console.log('Received image URL:', remoteMessage.notification.android.imageUrl);


//         const { CameraPrediction } = remoteMessage.notification.android.imageUrl;
//         navigationRef.current?.navigate(CameraPrediction);

//         // Render the image in your UI
//     }
// });

const Root = () => {

    return (
        <NavigationContainer >
            <AuthProvider>
                <AxiosProvider>
                    <App />
                </AxiosProvider>
            </AuthProvider>
        </NavigationContainer>

    );
};
AppRegistry.registerComponent(appName, () => Root);

// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
