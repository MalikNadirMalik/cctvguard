import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SectionList,
  ScrollView,
  Image,
  Button,
  Alert,
} from 'react-native';
import { navigation } from '@react-navigation/native';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import CheckBox from '@react-native-community/checkbox';
import * as Keychain from 'react-native-keychain';
import Spinner from '../components/Spinner';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';

const AddCameraActivityFeature = ({ navigation }) => {

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [activites, setActivites] = useState([]);
  const [videoURLmp4, setVideoURLmp4] = useState();
  const [subTextTab, setSubTextTab] = useState(0);
  const [activityFeature, setActivityFeature] = useState([]);
  const [camId, setCamId] = useState();
  const { authAxios } = useContext(AxiosContext);
  const [status, setStatus] = useState('idle');

  useEffect(() => {

    ApiFeature();
  }, []);

  // async function ApiFeature() {
  //   setStatus('loading');

  const ApiFeature = async () => {
    try {
      const response = await axiosContext.authAxios.get('/Activities');
      console.log(JSON.stringify('this is the response ...', response.data));
      console.log('this is the response ...', response.data);
      setActivites(response.data);


      // setStatus('success');

    } catch (error) {
      console.log('error', error);
      setStatus('error');
    }

    let cam_Id = await AsyncStorage.getItem('cam_Id');

    setCamId(cam_Id);
    console.log('cam_Id.....', cam_Id);

    let videoURL = await AsyncStorage.getItem('videoURL');

    setVideoURLmp4(videoURL);

    console.log('videoURLmp4....', videoURLmp4);
    console.log('camId.....', camId);


  }

  // if (status === 'loading') {
  //   return <Spinner />;
  // }

  function setSelection(e, item, index) {
    let values = [...activites];

    // console.log('values', values)
    if (item.checked == null || item.checked == false) {
      values[subTextTab].activityFeatures[index].checked = true;

      console.log(
        'ture data',
        values[subTextTab].activityFeatures[index].checked,
      );
      let activityFeatures = activityFeature;
      activityFeatures.push(values[subTextTab].activityFeatures[index]);
      setActivityFeature(activityFeatures);
    } else {
      values[subTextTab].activityFeatures[index].checked = false;
      activityFeature.splice(values[subTextTab].activityFeatures[index], 1);
      setActivityFeature(activityFeature);
    }
    setActivites(values);
  }

  console.log('activityFeature', activityFeature);

  function showData(key) {
    setSubTextTab(key);
  }

  async function PostCamera() {
    setStatus('loading');

    var data = activityFeature;
    var type = 'rtsp';
    var SourceVideo = 'video';
    var CamId = camId;
    console.log('.........parameter', data);

    try {
      const response = await axiosContext.authAxios.post(
        `/Cameras/addcamera/${type}/${SourceVideo}/${CamId}`,

        data,
      );
      console.log(JSON.stringify('this is the response ...', response));

      if ((response.status = 200)) {
        Alert.alert('Camera Stream successfully  added ');
        navigation.replace('Home');
      } else {
        Alert.alert('Camera Stream not  added please add again  ');
      }
    } catch (error) {
      console.log('error', error);
      // setStatus('error');
    }

  }
  if (status === 'loading') {
    return <Spinner />;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/MainBackGround.png')}
        style={styles.ImageBackground}>
        <View style={styles.AddCameraText}>
          <Text
            style={{
              fontSize: 18,
              color: '#ff8c00',
              alignSelf: 'center',
              marginTop: 5,
            }}>
            Activity Feature
          </Text>
        </View>
        <View style={styles.videoView}>
          <Video
            style={styles.Video}
            source={{ uri: videoURLmp4 }}
            controls={true}
            // ref={ref => {
            //   this.player = ref;
            // }}
            selectedVideoTrack={{
              type: 'resolution',
              value: 480,
            }}
            // resizeMode={'contain'}
            resizeMode="cover"
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
          <Text style={{ alignSelf: 'center', color: '#ff8c00', marginTop: 5 }}>
            CAMERA VIEW
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: '#ff8c00',
              width: '80%',
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', height: 380 }}>
          <View style={styles.Activity}>
            {activites.map((item, key) => (
              <View style={styles.MaskDetection} key={item.activityId}>
                {/* <TouchableOpacity */}
                {/* // onPress={showData()} */}

                <Button
                  style={{ backgroundColor: '#ff8c00' }}
                  title={item.activityName}
                  color="rgba(7, 7, 20, 0.877)"
                  onPress={() => showData(key)}
                />
                {/* <Text style={{ color: '#ff8c00' }}>
                                        {item.activityName}
                                    </Text> */}
                {/* <View style={{ height: 1, backgroundColor: '#ff8c00', width: "80%", alignSelf: 'center' }} /> */}

                {/* </TouchableOpacity> */}
              </View>
            ))}
          </View>

          <View style={{ height: 350 }}>
            <ScrollView
              style={styles.subText}
            // key={'' + item.activityId + item.featureId}
            >
              {activites[subTextTab]?.activityFeatures.map((item, index) => (
                <View
                  style={styles.subText1}
                  key={'' + item.activityId + item.featureId}>
                  {/* <FlatList

                                        renderItem={({ item }) =>
                                            <Text style={{ color: '#ff8c00', fontSize: 14, }}>
                                                {item.vmName}
                                            </Text>}
                                        /> */}

                  <CheckBox
                    id={'' + item.activityId + item.featureId}
                    tintColors={{ true: '#ff8c00', false: '#ff8c00' }}
                    value={item.checked}
                    onValueChange={e => {
                      setSelection(e, item, index);
                    }}
                    style={styles.checkbox}
                  />

                  <Text style={{ color: '#ff8c00', fontSize: 14 }}>
                    {item.vmName}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.loginbtn}
            onPress={() => PostCamera()}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
  },
  AddCameraText: {
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(7, 7, 20, 0.877)',
    marginTop: 10,
    alignSelf: 'center',
  },
  videoView: {
    width: '100%',
    height: 200,
  },

  Video: {
    alignSelf: 'center',
    marginTop: 5,
    width: 250,
    height: '80%',
  },

  Activity: {
    // width: '100%',
    height: 150,
    flexDirection: 'column',

    justifyContent: 'space-evenly',
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  subText: {
    flex: 1,
    // flexDirection: 'row',
    marginBottom: 10,

    // backgroundColor: 'red',
  },
  subText1: {
    flexDirection: 'row',
    // marginBottom: 10,
    // height: 40,
  },

  checkbox: {
    color: '#ff8c00',
    marginRight: 10,
    // marginBottom: 10,
    // marginLeft: 10,
    // backgroundColor: '#ff8c00',
  },
  MaskDetection: {
    flexDirection: 'column',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#ff8c00',
    // width: 150,
    marginTop: 15,
    marginRight: 20,
    marginLeft: 5,
  },
  loginbtn: {
    alignSelf: 'center',
    width: '20%',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#FF8c00',
  },
});
export default AddCameraActivityFeature;
