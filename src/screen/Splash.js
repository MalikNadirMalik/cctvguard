import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
//Splash Screen for the User experience.

const Splash = ({ navigation }) => {

    useEffect(() => {

        setTimeout(() => {
            navigation.replace('Home');


        }, 2000); // amount of time the splash is shown from the time component is rendered
    }, []);
    // console.log(navigation);
    return (
        <View style={styles.mainContainer}>
            <ImageBackground source={require('../Assets/MainBackGround.png')} style={styles.ImageBackground}>
                <Image source={require('../Assets/logo.png')} style={styles.logo} />
                {/* <Image source={require('../Assets/background.png')} style={styles.backgroundimg}/> */}

            </ImageBackground>
            <ImageBackground source={require('../Assets/background.png')} style={styles.backgroundimg} />

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        // height: hp('100%'),
        // width: wp('100%'),
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1
    },
    ImageBackground: {

        width: '100%',
        height: 400,

    },
    logo: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 80,
        marginTop: 300,



    },
    backgroundimg: {

        width: "100%",
        height: 400,




    }



})

export default Splash;