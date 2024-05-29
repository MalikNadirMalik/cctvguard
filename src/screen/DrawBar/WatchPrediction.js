import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
    FlatList,
    Alert
} from 'react-native';
import Video from 'react-native-video';
import SafeAreaView from 'react-native-safe-area-view';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../../components/Spinner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { type } from 'express/lib/response';


let video;

const WatchPrediction = ({ navigation }) => {
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [videoUrl, setVideoUrl] = useState("idle");
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        WatchPrediction();
    }, []);

    async function WatchPrediction() {
        setStatus('loading');
        let url = await AsyncStorage.getItem('url');
        setVideoUrl(url);
        if (status === 'loading') {
            return <Spinner />
        }


        setStatus('success');
    }
    // console.log("Video ..........", video);
    console.log("videoUrl ...........", videoUrl);
    return (
        <SafeAreaView>

            <View style={styles.container}>
                <ImageBackground
                    source={require('../../Assets/MainBackGround.png')}
                    style={styles.ImageBackground}>

                    <Video
                        source={{ uri: videoUrl }}
                        style={{ width: 200, height: 200, padding: 20, alignSelf: 'center', }}
                        resizeMode={'contain'}
                        controls={true}
                    // selectedVideoTrack={{
                    //   type: "resolution",
                    //   value: 480
                    // }}
                    // source={item.streamUrl}
                    // ref={(ref) => {
                    //   this.player = ref
                    // }}
                    // onBuffer={this.onBuffer}
                    // onError={this.videoError}
                    />





                </ImageBackground >

            </View >



        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    container: {
        // backgroundColor:'rgba(7, 7, 20, 0.877) ',
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
    },


});





export default WatchPrediction;