import 'react-native-gesture-handler'
import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import StackNavigation from '../navigation/StackNavigation';
import NotificationHandler from '../utils/NotificationHandler';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
const Dashboard = () => {

    return (
        <StackNavigation />
    )
}



export default Dashboard;