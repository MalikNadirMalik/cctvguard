import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';

const AuthContext = createContext(null);
const { Provider } = AuthContext;


const AuthProvider = ({ children }) => {
    const navigation = useNavigation();
    const [authState, setAuthState] = useState({
        token: null,
        refreshToken: null,
        authenticated: null,
    });


    const logout = async () => {


        let deviceId = await AsyncStorage.getItem('deviceId');
        console.log("deviceId at logout", deviceId);

        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('fcmtoken......', fcmToken);

        let id = await AsyncStorage.getItem('id');
        console.log('id......', id)
        const result = await axios.post('https://api.cctvguard.ai/api/Authentication/update-device', {
            "userId": id,
            "status": false,
            "deviceToken": fcmToken,
            "deviceId": deviceId
        });
        console.log("result", result);

        await Keychain.resetGenericPassword();
        setAuthState({
            token: null,
            refreshToken: null,
            authenticated: false,
        });
        navigation.navigate('Login');
    };

    const getAccessToken = () => {
        return authState.token;
    };

    return (
        <Provider
            value={{
                authState,
                getAccessToken,
                setAuthState,
                logout,
            }}>
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };