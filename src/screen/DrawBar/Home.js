import React, { useContext, useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  Button
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { AuthContext } from '../../context/AuthContext';
// import { AxiosContext } from '../../context/AxiosContext';
import { navigation } from "@react-navigation/native";

const Home = ({ navigation }) => {

  // const authContext = useContext(AuthContext);
  // const axiosContext = useContext(AxiosContext);

  // console.log('navigationHome', navigation)

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <ImageBackground source={require('../../Assets/MainBackGround.png')} style={styles.ImageBackground}>

          <ScrollView>
            <View style={styles.Flatgrid}>
              <View style={styles.leftbox}>
                <TouchableOpacity onPress={() => navigation.navigate('AddCamera')}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    ADD CAMERA
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>

                </TouchableOpacity>
              </View>


              <View style={styles.rightbox}>
                <TouchableOpacity onPress={() => navigation.navigate('CAMERAS ')}>
                  <MaterialCommunityIcons
                    name="camera-iris"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    CAMERAS
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Flatgrid}>
              <View style={styles.leftbox}>
                <TouchableOpacity>
                  <Ionicons
                    name="analytics"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    ANALYTICS
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>

                </TouchableOpacity>
              </View>

              <View style={styles.rightbox}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="table"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    TABLE
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Flatgrid}>
              <View style={styles.leftbox}>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                  <Ionicons
                    name="notifications"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    NOTIFICATION
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>

                </TouchableOpacity>
              </View>

              <View style={styles.rightbox}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="widgets"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    WIDGETS
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.Flatgrid}>
              <View style={styles.leftbox}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    MAPS
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>

                </TouchableOpacity>
              </View>

              <View style={styles.rightbox}>
                <TouchableOpacity>
                  <FontAwesome5
                    name="coins"
                    size={60}
                    color={'#ff8c00'}
                    style={{ alignSelf: 'center', marginTop: 5 }}
                  />
                  <Text style={{ alignSelf: 'center', color: '#ff8c00' }}>
                    PRICING
                  </Text>
                  <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>
                    Lorem lpsum is simplydummy text of the printing and typesetting industry.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
  },
  Flatgrid: {
    flexDirection: 'row',
    width: '95%',
    height: 150,

    marginTop: 21,

    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  leftbox: {
    width: '49%',
    height: '100%',
    marginRight: 5,
    backgroundColor: 'rgba(7, 7, 20, 0.877) '

  },
  rightbox: {
    width: '49%',
    height: '100%',
    marginLeft: 5,
    backgroundColor: 'rgba(7, 7, 20, 0.877) '
  },



});

export default Home;
