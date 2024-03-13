import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  Alert,
  // ScrollView
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import * as Keychain from 'react-native-keychain';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CameraActivities = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const axiosContext = useContext(AxiosContext);
  const [camId, setCamId] = useState();
  const [cameraData, setCameraData] = useState();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    getCameras();

  }, []);

  async function getCameras() {
    setStatus('loading');
    let CamId = await AsyncStorage.getItem('CamId');
    setCamId(CamId);
    console.log("camId....", camId);
    try {
      const response = await axiosContext.authAxios.get(`/Cameras/getcameraactivity/${camId}`,);
      console.log('this is response', response.data);
      var list = [];
      var cameras = [];
      var outPutStreamUrls = [];
      var camera = {};
      list = response.data;
      console.log('list of response ', list);
      for (let i = 0; i < list.length; i++) {
        outPutStreamUrls = [];
        outPutStreamUrls.push(JSON.parse(list[i]['outPutStreamUrls']));
        camera.camId = list[i]['camId'];
        camera.userId = list[i]['userId'];
        camera.source = list[i]['source'];
        camera.streamName = list[i]['streamName'];
        for (let s = 0; s < outPutStreamUrls.length; s++) {
          for (let e = 0; e < outPutStreamUrls[s].length; e++) {
            if (outPutStreamUrls[s][e]['hrn'] === 'MP4 progressive') {
              camera.outPutStreamUrls = outPutStreamUrls[s][e]['url'];
            }
          }
        }
        cameras.push(camera);

        camera = {};
      }

      setCameraData(cameras);
      var list1 = cameras;

      console.log('...............listcameraActivity', list1);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log('error', error);

    }


  }

  if (status === 'loading') {
    return <Spinner />;
  }


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../Assets/MainBackGround.png')}
          style={styles.ImageBackground}>
          <ScrollView>
            <FlatList
              data={cameraData}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                  <Video
                    source={{ uri: item.outPutStreamUrls }}
                    style={{
                      width: 350,
                      height: 220,
                      padding: 20,
                      alignSelf: 'center',
                    }}
                    resizeMode={'cover'}
                    // source={item.streamUrl}
                    ref={(ref) => {
                      this.player = ref
                    }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                  />

                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '50%',
                          marginLeft: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#ff8c00',
                            alignSelf: 'center',
                            marginLeft: 20,
                          }}>
                          {item.streamName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', width: '50%' }}>
                        <View style={{ marginLeft: 1 }}>
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
                        <View style={{ marginLeft: 1 }}>
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
                        <View style={{ marginLeft: 1 }}>
                          <TouchableOpacity>
                            <AntDesign
                              name="edit"
                              size={16}
                              color={'#ff8c00'}
                              // marginLeft={15}
                              paddingLeft={10}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 1 }}>
                          <TouchableOpacity>
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
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#ff8c00',
                        width: '80%',
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                </View>
              )}
              keyExtractor={item => item.camId}></FlatList>

            <View
              style={{
                width: 350,
                height: 250,
                borderColor: '#474c66',
                borderWidth: 4,
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddCameraActivityFeature')}>
                <MaterialCommunityIcons
                  name="plus"
                  size={200}
                  color={'#ff8c00'}
                  style={{
                    alignSelf: 'center',
                    marginTop: 5,
                    fontWeight: 'bold',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'center',
                color: '#ff8c00',
                fontSize: 16,
                marginTop: 10,
              }}>
              Add another Camera Detection
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: '#ff8c00',
                width: '80%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
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
export default CameraActivities;
