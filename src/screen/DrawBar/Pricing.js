import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import SafeAreaView from 'react-native-safe-area-view';


const Pricing = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
       <Text style={{color:'black',fontSize:24}}>
        this the Pricing
       </Text>
        </View>


     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
  },
 
});

export default Pricing;
