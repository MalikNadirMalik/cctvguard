import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto'

const ForgetPassword = ({ navigation }) => {
    // const [ForgetPassword,setForgetPassword]=useState();

    const [email, setEmail] = useState();
    const [Password, setPassword] = useState();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.ucontainer}>

                <View style={styles.textview}>
                    <Text style={styles.text}>Forget your password</Text>
                </View>
            </View>
            <View style={styles.mcontainer} >
                <View style={styles.emailview}>
                    <View style={styles.mailicon}>
                        <MaterialCommunityIcons
                            name="email"
                            size={18}
                            color={'black'}

                        />
                    </View>
                    <View style={styles.eview}>
                        <TextInput
                            style={styles.einput}
                            placeholder="Email"
                            placeholderTextColor={'grey'}
                            value={email}
                            onChangeText={value => setEmail(value)}
                            editable={true}
                            keyboardType="email-address"
                        />
                    </View>
                </View>
                <View style={styles.textView}>
                    <TouchableOpacity style={styles.code}>
                        <Text style={styles.textbutton}>Send Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.code}>
                        <Text style={styles.cancelbutton}>Cancel</Text>
                    </TouchableOpacity>


                </View>

            </View>
            <View style={styles.lcontainer} >
                {/* <View style={styles.rightcontain}>
                    <TouchableOpacity onPress={()=>navigation.replace('Welcome')}>
                    <View style={styles.rightupcontain}>
                        <Text style={styles.signtext}>Sign in</Text>
                        <View style={styles.signicon}>
                            <AntDesign name="arrowright"
                            size={26}
                            color={'black'} style={styles.arrow}
                            />
                        </View>
                    </View>
                    </TouchableOpacity>
                    <View style={styles.rightlcontain}>
                        <Text style={styles.create}>Don't Have an Account?</Text>
                        <TouchableOpacity>
                        <Text style={styles.create1 } onPress={()=>
                            navigation.navigate('Signup', { name: 'Signup' })}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: 'white',
        // justifyContent:'center',
        height: hp('100%'),
        width: wp('100%')
    },
    ucontainer: {
        height: ('20%'),
        width: ('100%'),
        // backgroundColor:'red',
        justifyContent: 'center'
    },
    mcontainer: {
        height: '40%',
        width: '100%',
        // backgroundColor:'green',
        // justifyContent:'center',
        marginTop: '6%',
        flexDirection: 'column'
    },
    lcontainer: {
        height: hp('40%'),
        width: wp('100%'),
        flexDirection: 'row'

    },
    textview: {
        justifyContent: 'center',
        // marginTop:hp('-6%')
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    emailview: {
        borderRadius: 80 / 2,
        height: hp('8%'),
        padding: 6,
        // width:wp('100%'),
        backgroundColor: 'white',
        flexDirection: 'row',
        marginLeft: wp('8%'),
        marginRight: wp('8%'),
        elevation: 5
    },
    mailicon: {
        width: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    eview: {
    },
    einput: {
        width: wp('70%'),
        fontSize: 18,
        // borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(158, 150, 150, .5)',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView: {
        height: '12%',
        flexDirection: 'row',
        //    backgroundColor:'green',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    code: {
        alignSelf: 'center',
        marginTop: '4%'
    },
    textbutton: {
        color: '#ff6600',
        fontSize: 14,
        fontWeight: 'bold'
    },
    cancelbutton: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500'
    }


})

export default ForgetPassword;