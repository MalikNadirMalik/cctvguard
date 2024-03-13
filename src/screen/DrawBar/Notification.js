
import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  TextInput
} from 'react-native';

import SafeAreaView from 'react-native-safe-area-view';


const Notification = ({navigation}) => {

  const [email, setEmail] = useState();
  const [number, setNumber]=useState();
  const [text , setText] = useState();


  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
      <ImageBackground
            source={require('../../Assets/MainBackGround.png')}
            style={styles.ImageBackground}>
         <View style={styles.ViewInput}>
         <TouchableOpacity style={styles.TouchableOpacity}>
                     <TextInput
                     style={styles.inputEmail}
                     placeholder="Email*"
                     placeholderTextColor='#ff8c00'
                     value = {email}
                     color='white'
                     onChangeText = {value => setEmail(value)}
                     editable = {true}
                     keyboardType = "email-address"
                     />

                     
                 </TouchableOpacity  >
                 <TouchableOpacity  style={{marginTop:25,marginLeft:30}}>
                  <Text style={{color:'#ff8c00',marginTop:10,fontSize:20 }}>
                    Add
                  </Text>
                 </TouchableOpacity>

         </View>

         <View style={styles.ViewInput}>
         <TouchableOpacity style={styles.TouchableOpacity}>
                     <TextInput
                     style={styles.inputEmail}
                     placeholder="Phone Number*"
                     placeholderTextColor='#ff8c00'
                     value = {number}
                     color='white'
                     onChangeText = {value => setNumber(value)}
                     editable = {true}
                     keyboardType = "Number"
                     />

                     
                 </TouchableOpacity  >
                 <TouchableOpacity  style={{marginTop:25,marginLeft:30}}>
                  <Text style={{color:'#ff8c00',marginTop:10,fontSize:20 }}>
                    Add
                  </Text>
                 </TouchableOpacity>

         </View>
         <View style={styles.ViewInput}>
         <TouchableOpacity style={styles.TouchableOpacity}>
                     <TextInput
                     style={styles.inputEmail}
                     placeholder="IP Address*"
                     placeholderTextColor='#ff8c00'
                     value = {text}
                     color='white'
                     onChangeText = {value => setText(value)}
                     editable = {true}
                     keyboardType = "text"
                     />

                     
                 </TouchableOpacity  >
                 <TouchableOpacity  style={{marginTop:25,marginLeft:30}}>
                  <Text style={{color:'#ff8c00',marginTop:10,fontSize:20 }}>
                    Add
                  </Text>
                 </TouchableOpacity>

         </View>

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
  ViewInput:{
    flexDirection:'row',
    marginTop:20,
  },

  TouchableOpacity:{

    marginLeft:10,
    marginTop:5,
    borderColor:'#ff8c00',
   borderBottomWidth:1,
   width:'70%',


},
 
});

export default Notification;
