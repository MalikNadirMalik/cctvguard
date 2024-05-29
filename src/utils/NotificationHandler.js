import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, Dimensions } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-async-storage/async-storage';



const NotificationHandler = () => {
    const [jsonData, setJsonData] = useState({});
    const [image, setImage] = useState("");

    useEffect(async () => {

        let data = await AsyncStorage.getItem('data');
        console.log("data in notification", JSON.parse(data));
        setJsonData(JSON.parse(data));
        console.log("jsonData", jsonData);
        let imageUrl = jsonData.imageUrl;
        setImage(imageUrl);
        this.forceUpdate();
        if (data == !null) {
            AsyncStorage.removeItem('data');
        }

    }, []);

    console.log("jsonData........", jsonData);
    console.log("image......", image);


    return (

        <View style={StyleSheet.container}>
            <ImageBackground source={require('../Assets/MainBackGround.png')} style={styles.ImageBackground}>


                <Text style={{ color: 'white', fontSize: 16, marginLeft: 10, marginTop: 20 }}>Title</Text>
                <Text style={{ color: '#ff8c00', fontSize: 16, marginLeft: 15, marginTop: 10 }}>
                    {jsonData.title}
                </Text>
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 10, marginTop: 20 }}>body</Text>
                <Text style={{ color: '#ff8c00', fontSize: 16, marginLeft: 1, marginTop: 10 }}>
                    {jsonData.body}
                </Text>
                <ImageZoom
                    style={{ width: 250, height: 250, marginTop: 0, }}
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={300}
                    imageHeight={300}>
                    <Image style={{ width: 250, height: 250, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}
                        source={{ uri: jsonData.imageUrl }} />
                </ImageZoom>

            </ImageBackground>
        </View>

    );
};
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
    },

});

export default NotificationHandler;