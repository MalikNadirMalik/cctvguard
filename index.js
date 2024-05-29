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
