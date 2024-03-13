import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useNavigation } from "@react-navigation/native";
import * as Keychain from 'react-native-keychain';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
    const navigation = useNavigation();

    const authContext = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: 'https://api.cctvguard.ai/api',
    });

    const publicAxios = axios.create({
        baseURL: 'https://api.cctvguard.ai/api',
    });

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    const refreshAuthLogic = async failedRequest => {
        const data = {
            token: authContext.authState.token,
            refreshToken: authContext.authState.refreshToken,

        };

        return axios.post('https://api.cctvguard.ai/api/Account/refreshtoken', data)
            .then(async tokenRefreshResponse => {

                console.log('response is ...', tokenRefreshResponse.data);
                const { token, refreshToken } = tokenRefreshResponse.data;
                console.log('access again token ', token);
                console.log('access again refreshToken', refreshToken);
                failedRequest.response.config.headers.Authorization =
                    'Bearer ' + tokenRefreshResponse.data.token;

                authContext.setAuthState({
                    ...authContext.authState,
                    token: tokenRefreshResponse.data.token,
                    refreshToken: tokenRefreshResponse.data.refreshToken,   // 

                });

                await Keychain.setGenericPassword(
                    'token',
                    JSON.stringify({
                        'token': tokenRefreshResponse.data.token,
                        'refreshToken': authContext.authState.refreshToken,
                    }),
                );

                return Promise.resolve();
            })
            .catch(e => {

                console.log('error', e);

                authContext.setAuthState({
                    // accessToken: null,
                    // token: null,
                    // refreshToken: null,
                    token: null,
                    refreshToken: null,
                    authenticated: false,

                });
                navigation.navigate('Login');

            });

    };

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
            }}>
            {children}
        </Provider>
    );
};

export { AxiosContext, AxiosProvider };