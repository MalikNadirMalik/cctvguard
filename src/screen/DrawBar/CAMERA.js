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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';
import Video from 'react-native-video';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import Spinner from '../../components/Spinner';
// import CameraActivities from '../../screen/DrawBar/CameraActivities';






const Camera = ({ navigation }) => {

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [cameraData, setCameraData] = useState();
  const [status, setStatus] = useState('idle');
  const [camId, setCamId] = useState();

  useEffect(() => {
    getCameras();
  }, []);

  async function getCameras() {
    setStatus('loading');
    try {
      const response = await axiosContext.authAxios.get('/Cameras/getcameras/');
      // console.log("this is response", response.data);

      var list = [];
      var cameras = [];
      var streamUrls = [];
      var camera = {};
      list = response.data;
      console.log("list of response ", list);
      for (let i = 0; i < list.length; i++) {
        streamUrls = [];
        streamUrls.push(JSON.parse(list[i]['streamUrls']));
        camera.camId = list[i]['camId'];
        camera.userId = list[i]['userId'];
        camera.source = list[i]['source'];
        camera.streamName = list[i]['streamName'];
        for (let s = 0; s < streamUrls.length; s++) {
          for (let e = 0; e < streamUrls[s].length; e++) {
            if (streamUrls[s][e]['hrn'] === "MP4 progressive") {
              camera.streamUrl = streamUrls[s][e]['url'];

            }
          }

        }
        cameras.push((camera));

        camera = {};
      }
      setCameraData(cameras);
      var list1 = cameras;
      console.log('...............', list1);
      // await AsyncStorage.setItem('cameraData', cameraData);
      setStatus('success')
    }

    catch (error) {
      console.log('error', error);
      setStatus('error');
    }

  }
  if (status === 'loading') {
    return <Spinner />
  }

  async function selectId(item) {
    setCamId(item.camId);
    await AsyncStorage.setItem('CamId', item.camId);
    navigation.navigate('CameraActivities');
    // navigation.replsace('CameraActivities');
  }
  console.log('....camid....', camId);
  console.log("cameraData..........", cameraData);

  async function DeleteCamera(item) {

    try {
      const response = await axiosContext.authAxios.post('/Cameras/remove-stream',
        item
      );
      console.log(response.data);

      if (data = 'successfully removed camera') {
        Alert.alert('successfully removed camera');
        navigation.replace('Home');
      }


    } catch (error) {
      console.error(error);

    }
    if (status === 'loading') {
      return <Spinner />
    }

  }


  return (
    <SafeAreaView>

      <View style={styles.container}>
        <ImageBackground
          source={require('../../Assets/MainBackGround.png')}
          style={styles.ImageBackground}>



          <FlatList
            // style={{ flexDirection: 'row', marginTop: 20, }}
            data={cameraData}
            renderItem={({ item }) =>
              <View style={{ flexDirection: 'column', marginTop: 20, }}>
                <Video
                  source={{ uri: item.streamUrl }}
                  style={{ width: 200, height: 200, padding: 20, alignSelf: 'center', }}
                  resizeMode={'contain'}
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

                < View style={{ flexDirection: 'column', }
                }>
                  <View style={{ flexDirection: 'row', }}>
                    <View style={{ flexDirection: 'row', width: '50%', marginLeft: 20, }}>
                      <Text style={{
                        fontSize: 20,
                        color: "#ff8c00",
                        alignSelf: 'center',
                        marginLeft: 20,
                      }}>{item.streamName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '50%', }}>
                      <View style={{ marginLeft: 10, }}>
                        <TouchableOpacity>
                          <AntDesign
                            name="playcircleo"
                            size={16}
                            color={'#ff8c00'}
                            // marginLeft={10}
                            paddingLeft={10}

                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: 1, }}>
                        <TouchableOpacity>
                          <AntDesign
                            name="pausecircleo"
                            size={16}
                            color={'#ff8c00'}
                            // marginLeft={10}
                            paddingLeft={10}

                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: 1, }}>
                        <TouchableOpacity
                          onPress={() => selectId(item)}
                        // onPress={() => navigation.navigate('CameraActivities', { camId: item.camId })}
                        >

                          <AntDesign
                            name="edit"
                            size={16}
                            color={'#ff8c00'}
                            // marginLeft={15}
                            paddingLeft={10}

                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: 1, }}>
                        <TouchableOpacity onPress={() => DeleteCamera(item)}>
                          <AntDesign
                            name="delete"
                            size={16}
                            color={'#ff8c00'}
                            // marginLeft={20}
                            paddingLeft={10}

                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{ height: 1, backgroundColor: '#ff8c00', width: "80%", alignSelf: 'center', marginTop: 10, }} />
                </View>




              </View>



            }

            keyExtractor={item => item.camId}


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
  imgView: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    marginTop: 20,

  },
  img: {
    width: '100%',
    height: 200,

  }
});
export default Camera;