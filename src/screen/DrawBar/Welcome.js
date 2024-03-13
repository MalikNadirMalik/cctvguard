import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    heightPercentageToDP,
    widthPercentageToDP,
  } from 'react-native-responsive-screen';

const Welcome =({navigation})=>{

    return(
        
        <View style={styles.mainContainer}>
            <View style={styles.ucontainer}>
                <View style={styles.inContainer}>
                    <Text style={styles.utext}>Project Argus</Text>
                </View>
            </View>
            <ScrollView>
            <View style={styles.midConatiner}>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
                <Text style={styles.text}>- Stage 1.2: Attach ArbotixM to the Base Plate using 4</Text>
                <Text style={styles.text1}>M3X6 Socket Heads.</Text>
               
            </View>
            </ScrollView>
            <View style={styles.lcontainer}>
                <TouchableOpacity 
                onPress={()=>
                    navigation.replace('Home')}>
                    <View style={styles.button} >
                        <Text style={styles.utext}>Begin</Text>
                   </View>
                </TouchableOpacity>
                
            </View>
            
        </View>
        
    )
}
const styles=StyleSheet.create({
    mainContainer:{
        backgroundColor:'white',
        height:hp('100%'),
        width:wp('100%')
    },
    ucontainer:{
        height:hp('10%'),
        // backgroundColor:'red',
        overflow: 'hidden',
        paddingBottom: 5,
        justifyContent:'center'
        
    },
    utext:{
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    inContainer:{
        height:hp('10%'),
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        justifyContent:'center',
        elevation: 5,
    },
    midConatiner:{
        flexDirection:'column',
        // backgroundColor:'green'
    },
    text:{
        color:'black',
        fontSize:14,
        margin:('4%')
    },
    text1:{
        color:'black',
        fontSize:14,
        marginLeft:wp('6%'),
        marginTop:hp('-2%')
    },
    lcontainer:{
       
        // backgroundColor:'red'
        justifyContent:'flex-end',
        alignItems:"flex-end",
    },
    button:{
        borderRadius:4,
        backgroundColor:'#19B5FE',
        alignSelf:'center',
        height:hp('6%'),
        width:wp('30%'),
        justifyContent:'center',
        marginBottom:hp('4%'),
        marginRight:wp('2%')
    }

})
export default Welcome;
