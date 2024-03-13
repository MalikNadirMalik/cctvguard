import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const [state, setState] = useState('');
  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [Password, setUserPassword] = useState('');
  //const {number, setNumber} = useState();
  const navigation = useNavigation();

  const doUserRegistration = async function () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "userName": UserName,
      "userEmail": UserEmail,
      "password": Password,
      "role": ""
    });


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    const response = await fetch('http://65.108.45.158:8083/api/Authentication/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UserName: UserName,
        UserEmail: UserEmail,
        Password: Password,
        "role": "",
      })
    });
    const json = await response.json();
    console.log(json, '0');
    json.message == 'User created successfully!' && navigation.navigate('Login')


  };
  return (
    <View style={StyleSheet.container}>
      <ImageBackground
        source={require('../Assets/background.png')}
        style={styles.ImageBackground}>
        <View style={styles.subcontainer}>
          <Image source={require('../Assets/logo.png')} style={styles.logo} />

          <View style={styles.login}>
            <TouchableOpacity style={styles.TouchableOpacity}>
              <TextInput
                style={styles.inputName}
                placeholder="UserName*"
                placeholderTextColor="#ff8c00"
                value={UserName}
                color="white"
                // onChange={UserName}
                onChangeText={(value) => setUserName(value)}
                editable={true}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.TouchableOpacity}>
              <TextInput
                style={styles.inputEmail}
                placeholder="Email*"
                placeholderTextColor="#ff8c00"
                value={UserEmail}
                color="white"
                //onChange={UserEmail}
                editable={true}
                maxLength={30}
                onChangeText={(value) => setUserEmail(value)}
                keyboardType="email-address"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.TouchableOpacity}>
              <TextInput
                style={styles.inputpass}
                name="Password"
                placeholder="New Password*"
                color="white"
                autoCapitalize="none"
                placeholderTextColor="#ff8c00"
                autoCorrect={false}
                textContentType="newPassword"
                editable={true}
                secureTextEntry
                value={Password}
                enablesReturnKeyAutomatically
                maxLength={15}
                onChangeText={(value) =>
                  setUserPassword(value)
                }
              //  onChange={PasswordValue}
              >

              </TextInput>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => doUserRegistration()}>
              <Text>SIGNUP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.text}>if you have already Account?Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  ImageBackground: {
    height: '100%',
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
  inputEmail: {},

  loginbtn: {
    width: '90%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 40,
    backgroundColor: '#FF8c00',
  },
  text: {
    color: 'white',
    marginTop: 30,
  },
});

export default Signup;
