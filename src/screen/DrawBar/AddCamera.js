import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Button,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import * as Keychain from 'react-native-keychain';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';



let cam_Id;
let videoURL;

const AddCamera = ({ navigation }) => {

  const [source, setSource] = useState();
  const [location, setLocation] = useState();
  const [status, setStatus] = useState('idle');
  const [videoURLmp4, setVideoURLmp4] = useState();
  const [camId, setCamId] = useState();
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const axiosContext = useContext(AxiosContext);



  // const PreviewButtion = async () => {
  async function PreviewButtion() {

    setStatus('loading');

    try {
      const response = await axiosContext.authAxios.post('/Cameras/addstream', {
        "source": source,
        "streamUserName": null,
        "streamPassword": null,
        "publicKey": null,
        "location": location,
      });
      const result = response.data.data;
      // console.log('...........this is result', result);
      cam_Id = result.camId;
      setCamId(cam_Id);
      console.log(cam_Id);
      // setCamId(cam_Id);
      videoURL = result.streamSource
      // setVideoURLmp4(result.streamSource);
      console.log(videoURL);
      setVideoURLmp4(videoURL);

      await AsyncStorage.setItem('cam_Id', cam_Id);
      await AsyncStorage.setItem('videoURL', videoURL);
    } catch (error) {
      setStatus('error');
      console.log('error........', error);
    }
    if (status === 'loading') {
      return <Spinner />;
    }
    setStatus('success');


  };
  console.log('camId....', camId);

  console.log('videoURLmp4....', videoURLmp4);


  return (
    <SafeAreaView >
      <View style={styles.container}>
        <ImageBackground
          source={require('../../Assets/MainBackGround.png')}
          style={styles.ImageBackground}>
          <View style={styles.AddCameraText}>
            <Text
              style={{
                fontSize: 18,
                color: '#ff8c00',
                alignSelf: 'center',
                marginTop: 5,
              }}>
              ADD CAMERA STREAM
            </Text>

          </View>

          <View style={styles.TextInput}>
            <View style={styles.Firstline}>
              <TouchableOpacity style={styles.SourceTouchableOpacity} >
                <TextInput
                  style={styles.source}
                  placeholder="source*"
                  placeholderTextColor="#ff8c00"
                  value={source}
                  onChangeText={value => setSource(value)}
                  editable={true}
                />
              </TouchableOpacity>

            </View>

            <View style={styles.Firstline}>
              <TouchableOpacity style={styles.TouchableOpacity}>
                <TextInput
                  style={styles.location}
                  placeholder="Place/Location*"
                  placeholderTextColor="#ff8c00"
                  value={location}
                  onChangeText={value => setLocation(value)}
                  editable={true}
                />
              </TouchableOpacity>
            </View>

          </View>

          <Video style={styles.Video}
            source={{ uri: videoURLmp4 }}
            // style={{ width: 300, height: 300 }}
            // http://192.168.55.206:8080/string.mp4
            controls={true}
            resizeMode="cover"
          // ref={(ref) => {
          //   this.player = ref
          // }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            < TouchableOpacity style={styles.loginbtn} onPress={() => PreviewButtion()}>
              <Text>Preview</Text>
            </TouchableOpacity>
            < TouchableOpacity style={styles.loginbtn} onPress={() => navigation.navigate('AddCameraActivityFeature')}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View >
    </SafeAreaView >
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
    width: '100%',
    height: '100%',
  },
  AddCameraText: {
    width: '95%',
    height: 50,
    backgroundColor: 'rgba(7, 7, 20, 0.877)',
    marginTop: 15,
    alignSelf: 'center',
  },

  TextInput: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  Firstline: {
    flexDirection: 'row',
    alignSelf: 'center',

  },
  SourceTouchableOpacity: {
    margin: 5,
    borderColor: '#ff8c00',
    borderBottomWidth: 1,
    width: '75%',
    alignSelf: 'center',

  },
  TouchableOpacity: {
    margin: 5,
    borderColor: '#ff8c00',
    borderBottomWidth: 1,
    width: '45%',
    alignSelf: 'center',


  },
  source: {
    color: 'white',
    fontSize: 16,

  },
  location: {
    color: 'white',
    fontSize: 16,

  },

  Video: {
    alignSelf: 'center',
    marginTop: 25,
    width: 390,
    height: 300,
  },
  loginbtn: {
    alignSelf: 'center',
    width: '20%',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 40,
    backgroundColor: '#FF8c00',
  },
});
export default AddCamera;
