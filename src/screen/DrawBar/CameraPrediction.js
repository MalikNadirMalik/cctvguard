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
    Alert, ActivityIndicator, Dimensions
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../../components/Spinner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImageZoom from 'react-native-image-pan-zoom';

const CameraPrediction = ({ navigation }) => {
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [predictData, setPredictData] = useState([]);
    // const [status, setStatus] = useState('idle');
    const [videoUrl, setVideoUrl] = useState();
    // const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]); // State variable to hold data
    const [isLoadingMore, setIsLoadingMore] = useState(false); // State variable to track loading status
    const [page, setPage] = useState(1); // State variable to track page/offset

    useEffect(() => {
        PredictionEvent();
    }, []);

    async function PredictionEvent() {

        // setIsLoading(true);
        // setStatus('loading')
        setIsLoadingMore(true); // Set loading status to true
        let CamId = await AsyncStorage.getItem('predicCamId');
        console.log('camId in Prediction', CamId);

        try {
            const response = await axiosContext.authAxios.get(`/CameraActivities/getcamerapredictedimages/${CamId}/${page}`,
            );
            // console.log(response.data);
            // setPredictData(response.data)
            const newData = await response.data.json();
            setData([...data, ...newData]); // Update data state with new data
            setPage(page + 1); // Increment page/offset for next fetch
            // setPage(page + 1);
            // console.log(page);

        } catch (error) {
            console.error(error);

        }
        setIsLoadingMore(false); // Reset loading status after fetch is complete

        // if (status === 'loading') {
        //     return <Spinner />
        // }


        // setStatus('success');
    }

    async function watchVideo(item) {
        let url = item.videoUrl
        // let type = ".mp4"
        // let resulturl = url.concat(type);

        setVideoUrl(url);
        await AsyncStorage.setItem('url', url);
        navigation.navigate('WatchPrediction');
    }
    const renderFooter = () => {
        if (!isLoading) return null;

        return <ActivityIndicator style={{ marginVertical: 20 }} />;

    };

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <ImageBackground
                    source={require('../../Assets/MainBackGround.png')}
                    style={styles.ImageBackground}>



                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'column', marginTop: 20, width: '100%' }}>
                                {/* <Image
                                    style={{ width: "90%", height: 200, padding: 20, marginLeft: 20, }}
                                    source={{
                                        uri:
                                            item.predictionSource
                                    }}
                                /> */}
                                <ImageZoom cropWidth={Dimensions.get('window').width}
                                    cropHeight={Dimensions.get('window').height}
                                    imageWidth={200}
                                    imageHeight={200}>
                                    <Image
                                        style={{ width: "90%", height: 200, padding: 20, marginLeft: 20, }}
                                        source={{
                                            uri:
                                                item.predictionSource
                                        }}
                                    />
                                </ImageZoom>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#ff8c00', marginLeft: 10, fontSize: 20 }}>
                                            {item.information}
                                        </Text>
                                        <Text style={{ color: '#ff8c00', marginLeft: 20, fontSize: 18 }}>
                                            {item.currentTime}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => watchVideo(item)}>
                                        <View style={{ flexDirection: 'row', marginLeft: 20, }}>

                                            <AntDesign
                                                name="playcircleo"
                                                size={26}
                                                marginTop={15}
                                                color={'#ff8c00'}
                                                // marginLeft={10}
                                                paddingLeft={10}

                                            />
                                            <Text style={{ color: '#ff8c00', fontSize: 20, marginLeft: 10, marginTop: 15, }}>
                                                watch
                                            </Text>


                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }


                        onEndReached={PredictionEvent} // Trigger fetchData function when end of list is reached
                        onEndReachedThreshold={0.1} // How close to the end of the list (in terms of percentage) to trigger the onEndReached callback
                        ListFooterComponent={renderFooter}  // Render loading indicator at the bottom
                    // keyExtractor={item => item.camId}
                    >

                    </FlatList>



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





export default CameraPrediction;