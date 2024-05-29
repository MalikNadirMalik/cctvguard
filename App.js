import 'react-native-gesture-handler'
import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from './src/context/AuthContext';
import Login from './src/screen/Login';
import * as Keychain from 'react-native-keychain';
import Spinner from './src/components/Spinner';
import { useNavigation, useNavigationContainerRef } from "@react-navigation/native";
import Dashboard from './src/components/Dashboard';
import { requestUserPermission, NotificationServices } from './src/utils/PushNotification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { json } from 'express/lib/response';
import Home from './src/screen/DrawBar/Home';


const App = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.token || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.token !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        token: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    requestUserPermission();

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', (remoteMessage));
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("message handle at the background ", remoteMessage)
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log("Notification caused app open from quit state at openapp", remoteMessage.notification);
      let data = remoteMessage.notification;

      await AsyncStorage.setItem('data', JSON.stringify({ title: data.title, body: data.body, imageUrl: data.android.imageUrl }));
      navigation.navigate("NotificationHandler");

    });

    messaging().getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log("Notification caused app open from quit state", remoteMessage.notification);
          let data = remoteMessage.notification;
          console.log(data);
          await AsyncStorage.setItem('data', JSON.stringify({ title: data.title, body: data.body, imageUrl: data.android.imageUrl }));
          navigation.navigate("NotificationHandler");
        }

      });


    loadJWT();
  }, [loadJWT]);

  if (authContext?.authState?.authenticated === false) {
    return <Login />;
  } else {

    return <Dashboard />;
  }
};

export default App;              
