import React, { useContext, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';

function CustomDrawer(props) {
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../Assets/logo.png')} />
      </View>
      {/* <DrawerContentScrollView {...props}> */}
      <Drawer.Section style={styles.contentDrawer}>
        <Drawer.Item
          icon={({ color, size }) => (
            <MaterialIcons name="dashboard" color={"#ff8c00"} size={20} />
          )}
          label="DASHBOARD"
          onPress={() => props.navigation.navigate('Dashboard')}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="plus"
              size={25}
              color={'#ff8c00'}
              style={{ alignSelf: 'center', marginTop: 5 }}
            />
          )}
          label="ADD CAMERA"
          onPress={() => props.navigation.navigate('AddCamera')}
        />

        <Drawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="camera-iris"
              size={25}
              color={'#ff8c00'}
            />
          )}
          label="CAMERAS"
          onPress={() => props.navigation.navigate('CAMERAS ')}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <Ionicons
              name="analytics"
              size={25}
              color={'#ff8c00'}

            />
          )}
          label="ANALYTICS"
          onPress={() => props.navigation.navigate('ANALYTICS')}
        />

        <Drawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="table"
              size={25}
              color={'#ff8c00'}

            />
          )}
          label="TABLES"
          onPress={() => props.navigation.replace('Welcome')}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <Ionicons
              name="notifications"
              size={25}
              color={'#ff8c00'}
            />
          )}
          label="NOTIFICATION"
          onPress={() => props.navigation.navigate('Notification')}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="widgets"
              size={25}
              color={'#ff8c00'}
            />
          )}
          label="WIDGETS"
          onPress={() => props.navigation.navigate('Widgets')}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              size={25}
              color={'#ff8c00'}

            />
          )}
          label="MAPS"
          onPress={() => props.navigation.replace('Welcome')}
        />
      </Drawer.Section>
      <View style={styles.buttonGroup}>
        {/* <Button title="Get Image" onPress={loadImage} /> */}
        <Button title="Logout"
          color="#ff8c00"
          onPress={() => authContext.logout()}
        />
      </View>
      {/* </DrawerContentScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
  },

  img: {
    height: 70,
    width: 270,
    // alignSelf:'center'
  },

  contentDrawer: {
    marginTop: '4%',
  },
  bottomDrawerSection: {
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
    marginLeft: 10,
    borderRadius: 30,

  },
});
export default CustomDrawer;
