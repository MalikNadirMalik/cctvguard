import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from "@react-navigation/native";

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