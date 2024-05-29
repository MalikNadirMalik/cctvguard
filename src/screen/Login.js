import React, { useContext, useState, Ref, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Button,
    Alert,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { AxiosContext } from '../context/AxiosContext';
import Spinner from '../../src/components/Spinner';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';



const Login = () => {

    // const [userName, setUserName] = useState('NadirMalik');
    const [userName, setUserName] = useState('Aliwwtj');
    const [status, setStatus] = useState('idle');
    // const [password, setPassword] = useState('Malik@0987');
    const [password, setPassword] = useState('Asdzxc@123');
    const authContext = useContext(AuthContext);
    const { publicAxios } = useContext(AxiosContext);
    const [deviceId, setDeviceId] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        getdeviceId();
    });

    const getdeviceId = async () => {
        let DeviceUniqueId = DeviceInfo.getUniqueId();
        setDeviceId(DeviceUniqueId._j);
        // let deviceId = DeviceUniqueId._j;
        console.log('uniqueId of the device', deviceId);
        await AsyncStorage.setItem('deviceId', deviceId);
    };

    const onLogin = async () => {



        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('DeviceToken', fcmToken);
        setStatus('loading');

        try {

            const response = await publicAxios.post('/Authentication/login', {
                "id": "string",
                "normalizedUserName": "string",
                "normalizedEmail": "string",
                "emailConfirmed": true,
                "passwordHash": "string",
                "securityStamp": "string",
                "concurrencyStamp": "string",
                "phoneNumber": "string",
                "phoneNumberConfirmed": true,
                "twoFactorEnabled": true,
                "lockoutEnd": "2022-09-20T10:54:35.595Z",
                "lockoutEnabled": true,
                "accessFailedCount": 0,
                "userId": "string",
                "userName": userName,
                "email": "string",
                "password": password,

            });
            const { token, refreshToken, id } = response.data;
            console.log("login data", response.data);
            // console.log('userId', id);



            await AsyncStorage.setItem('id', id);
            authContext.setAuthState({
                token,
                refreshToken,
                authenticated: true,
            });
            if (status === 'loading') {
                return <Spinner />
            }


            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                    token,
                    refreshToken,
                }),
            );

            const result = await axios.post('https://api.cctvguard.ai/api/Authentication/update-device', {
                "userId": id,
                "status": true,
                "deviceToken": fcmToken,
                "deviceId": deviceId,
            });
            // console.log("result", result);
            setStatus('success');
        }

        catch (error) {
            setStatus('error')
            Alert.alert('Login Failed', error.response.data.message);

        }
    };

    return (
        <View style={StyleSheet.container}>
            <ImageBackground source={require('../Assets/background.png')} style={styles.ImageBackground}>
                <View style={styles.subcontainer}>
                    <Image source={require('../Assets/logo.png')} style={styles.logo} />
                    <View style={styles.login}>
                        <TouchableOpacity style={styles.TouchableOpacity}>
                            <TextInput
                                style={styles.inputName}
                                placeholder="UserName*"
                                placeholderTextColor='#ff8c00'
                                value={userName}
                                onChangeText={value => setUserName(value)}
                                editable={true}
                                keyboardType='default'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.TouchableOpacity}>
                            <TextInput
                                style={styles.inputPass}
                                name='Password'
                                placeholder='password*'
                                color='white'
                                placeholderTextColor='#ff8c00'
                                autoCapitalize='none'
                                autoCorrect={false}
                                textContentType='newPassword'
                                secureTextEntry
                                value={password}
                                enablesReturnKeyAutomatically
                                maxLength={15}
                                onChangeText={value => setPassword(value)}
                            >
                            </TextInput>

                        </TouchableOpacity >
                        <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate("ForgetPassword")}>
                            <Text style={styles.forgottext}>
                                Forgot?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginbtn} onPress={() => onLogin()}>
                            <Text style={{ color: 'white' }}>
                                LOGIN
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginbtn}>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo
                                    name="key"
                                    size={16}
                                    color={'white'}
                                // marginLeft={10}
                                // paddingLeft={10}

                                />
                                <Text style={{ color: 'white', marginLeft: 10, }}>
                                    Sign in with SSO
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>

                            <Text style={styles.text}>
                                Don't have an Account?Signup
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
    },
    ImageBackground: {
        height: '100%',
        width: '100%',
    },
    subcontainer: {
        flexDirection: 'column',
        width: '50%',
        height: 400,
        marginTop: 80,
    },
    logo: {
        width: 350,
        height: 90,
    },
    login: {
        marginTop: 40,
        marginLeft: 10,
    },
    TouchableOpacity: {
        margin: 5,
        borderColor: '#ff8c00',
        borderBottomWidth: 1,
    },
    inputName: {
        color: '#fff',
    },
    inputPass: {
        color: '#fff'
    },
    forgot: {
        marginLeft: 120,
    },
    forgottext: {
        color: 'white'
    },

    loginbtn: {
        width: "100%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginTop: 40,
        backgroundColor: "#FF8c00",

    },
    text: {
        color: 'white',
        marginTop: 30,
        marginLeft: 20,
    }
})
export default Login;