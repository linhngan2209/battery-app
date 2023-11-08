import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { NAVIGATIONS_ROUTE } from "../../navigation/Routes";
import IcLogo from '../../shared/icons/ic_logo.svg';


const SplashScreen = ({navigation}: any) => {
    const handleNavigation = () => {
        navigation.dispatch(CommonActions.navigate({name:NAVIGATIONS_ROUTE.SCREEN_LOGIN}))
    }

    useEffect(() => {
        setTimeout(handleNavigation, 3000)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.text}>ENERGY</Text>
                <IcLogo />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e'
    },
    logo: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 30,
        letterSpacing: 8,
    }, 
    linearGradient: {
        
    }

})

export default SplashScreen