import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Linking, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screen/Splash';
import Login from '../screen/Login';
import ForgetPassword from '../screen/ForgetPassword';
import Signup from '../screen/Signup';
import Welcome from '../screen/DrawBar/Welcome';
import Dashboard from '../screen/DrawBar/Home';
import CAMERAS from '../screen/DrawBar/CAMERA'
import ANALYTICS from '../screen/DrawBar/ANALYTICS';
import TABLES from '../screen/DrawBar/TABLES'
import AddCamera from '../screen/DrawBar/AddCamera';
import AddCameraActivityFeature from '../screen/AddCameraActivityFeature';
import Notification from '../screen/DrawBar/Notification';
import Widgets from '../screen/DrawBar/Widgets';
import MAPS from '../screen/DrawBar/MAPS';
import Pricing from '../screen/DrawBar/Pricing';
import CustomDrawer from './CustomDrawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createDrawerNavigator, } from '@react-navigation/drawer';
import CameraActivities from '../screen/DrawBar/CameraActivities';
import CameraPrediction from '../screen/DrawBar/CameraPrediction';
import WatchPrediction from '../screen/DrawBar/WatchPrediction';
import PushNotification from '../utils/PushNotification';
import NotificationHandler from '../utils/NotificationHandler';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer{...props} />} >
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        drawerIcon: ({ color }) => {
          <MaterialIcons name='dashboard' color={color} size={22} />
        }
      }} />
      <Drawer.Screen name='AddCamera' component={AddCamera} options={{ headerShown: true, headerTintColor: '#ff8c00', }} />
      <Drawer.Screen name='AddCameraActivityFeature' component={AddCameraActivityFeature} options={{ headerShown: true }} />
      <Drawer.Screen name='CAMERAS ' component={CAMERAS} options={{ headerShown: true }} />
      <Drawer.Screen name='ANALYTICS' component={ANALYTICS} options={{ headerShown: true }} />
      <Drawer.Screen name='TABLES' component={TABLES} options={{ headerShown: true }} />
      <Drawer.Screen name='Notification' component={Notification} options={{ headerShown: true }} />
      <Drawer.Screen name='Widgets' component={Widgets} options={{ headerShown: true }} />
      <Drawer.Screen name='MAPS' component={MAPS} options={{ headerShown: true }} />
      <Drawer.Screen name='Pricing' component={Pricing} options={{ headerShown: true }} />
      <Drawer.Screen name='CameraActivities' component={CameraActivities} options={{ headerShown: true, }} />


    </Drawer.Navigator>
  )
}

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={DrawerRoutes} options={{ headerShown: false }} />
      <Stack.Screen name="CameraPrediction" component={CameraPrediction} options={{ headerShown: false }} />
      <Stack.Screen name="WatchPrediction" component={WatchPrediction} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationHandler" component={NotificationHandler} options={{ headerShown: false }} />
      <Stack.Screen name="PushNotification" component={PushNotification} options={{ headerShown: false }} />

    </Stack.Navigator>

  )

}
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
export default StackNavigation;