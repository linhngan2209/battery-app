import React, {useState, } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IconLogo from '../../../src/shared/icons/ic_logo.svg';

import { CommonActions } from "@react-navigation/native";
import { NAVIGATIONS_ROUTE } from "../../navigation/Routes";
import BaseTextInput from "../../shared/ui/BaseTextInput";
import BaseButton from "../../shared/ui/BaseButton";



const LoginScreen = ({navigation} : any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNav = () => {
        navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION}))
    }
    // const handleConfirm = async () => {
    //     try{
    //     const deviceToken  = await messaging().getToken() 
    //      await axiosClient.post('/auth/login', {email, password, deviceToken})
    //     .then ( (res) => {
    //         if(res.status===200) {
    //             AsyncStorage.setItem('token', res.data.token);
    //             Alert.alert('Login successful')
    //             dispatch(getUserInfoAction())
    //             navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION,{name: NAVIGATIONS_ROUTE.SCREEN_HOME}))
    //         }
    //         else if (res.status===201) {
    //             Alert.alert('Account does not exist')
    //         } else {
    //             Alert.alert('Password does not match')
    //         }
    //     })} catch(err) {
    //         console.log(err)
    //     }
       
    // }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconLogo width={120} height={120}/>
            </View>
            <View style={styles.content}>
            <View style={styles.btn}>
                <BaseTextInput 
                placeholder={'Phone number'}
                boxstyle={styles.box}
                onChangeText={(text) => setEmail(text)}
                isPassword={false}
                />
            </View>
            
            <View style={styles.btn}>
                <BaseTextInput 
                    placeholder={'Password'}
                    boxstyle={styles.box}
                    onChangeText={(text) => setPassword(text)}
                    isPassword={true}
                />
            </View>
            <View style={styles.forgotPass}>
                <Text style={styles.textForgot}>Forgot Password?</Text>
            </View>
            <View style={styles.footerLogin}>
                <View style={styles.login}>
                    <View style={styles.loginButton}>
                        <BaseButton 
                        title={'LOGIN'}  
                        containerStyle={styles.loginButton}  
                        titleStyle={styles.titleLogin}
                        action={handleNav}
                    />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.firstFooter}>Don't have an account? </Text>
                    <TouchableOpacity onPress={handleNav}>
                        <Text style={styles.secondFooter}>Register </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flex: 0.4,
        alignItems:'center',
        justifyContent:'center',
    },
    content: {
        flex: 0.6,
        marginVertical: 40,
        alignItems: 'center',
       
    },
    btn: {
        marginVertical: 10,
    },
    box: {
        width: 320,
        height: 42,
        borderBottomColor: '#A6AAB4',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
    },
    forgotPass: {
       alignSelf :'flex-end',
       marginHorizontal: 30,  
       marginVertical: 15, 
    },
    textForgot: {
        fontSize: 14,
        color: '#0C2964'
    },
    footerLogin: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'

    },
    login: {
        justifyContent: 'center',      
    },
    loginButton: {
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#f2f2f2',
        borderRadius: 8,
        width: 300,
        height: 42,
        backgroundColor: '#0C2964'
    },
    titleLogin: {
        fontSize: 14,
        fontFamily:'medium',
        color: '#fff',
        fontWeight: 'bold',

    },
    footer: {
        marginVertical: 30,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    firstFooter: {
        fontSize: 12,
        fontFamily:'medium',
        color: '#000',
    },
    secondFooter: {
        fontSize: 12,
        fontFamily:'medium',
        color: '#F5591F',
    }
    
})

export default LoginScreen