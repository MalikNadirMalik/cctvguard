
import React from 'react';
import { ActivityIndicator, StyleSheet, View,ImageBackground } from 'react-native';

const Spinner = () => (
    <View style={styles.container}>
          <ImageBackground
          source={require('../Assets/MainBackGround.png')}
          style={styles.ImageBackground}>
             <ActivityIndicator size="large" color="#ff8c00" />
        </ImageBackground>
       
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    ImageBackground:{
        width:'100%',
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Spinner;