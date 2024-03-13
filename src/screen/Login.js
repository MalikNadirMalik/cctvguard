import React, { useContext, useState, Ref } from 'react';
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
import { AuthContext } from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { AxiosContext } from '../context/AxiosContext';
import Spinner from '../../src/components/Spinner';
import { useNavigation } from "@react-navigation/native";



const Login = () => {

    const [userName, setUserName] = useState('NadirMalik');
    const [status, setStatus] = useState('idle');
    const [password, setPassword] = useState('Malik@0987');
    const authContext = useContext(AuthContext);
    const { publicAxios } = useContext(AxiosContext);
    const navigation = useNavigation();

    console.log('LoginNavigation', navigation)

    const onLogin = async () => {
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


            const { token, refreshToken } = response.data;
            console.log(response.data);
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

            // setStatus('success');
        } catch (error) {
            setStatus('error')
            Alert.alert('Login Failed', error.response.data.message);

        }
    };
    // const onSignup = async () => {
    //     navigation.navigate('Signup');
    //     console.log('goto')
    // }
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
                            <Text>
                                LOGIN
                            </Text>

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
        width: "90%",
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
    }
})
export default Login;