import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar, 
  ViewStyle,
  TextInput
} from 'react-native';
import IconLocation from '../../../shared/icons/ic_location.svg'
import IconCharging from '../../../shared/icons/ic_charging.svg'
import IconVector from '../../../shared/icons/ic_vector.svg'
import IconClock from '../../../shared/icons/ic_clock.svg'
import IconChargingMini from '../../../shared/icons/ic_chargingMini.svg'
import BaseButton from '../../../shared/ui/BaseButton';
import IconFlash from '../../../shared/icons/ic_flash.svg';

type ChargingCardProps = {
   nameCharging: string,
   address: string,
   time: string,
   totalTime: string,
}
const ChargingHistoryCard= (props: ChargingCardProps) => {
    return (
        <View style={[styles.container]} >
            <View style={styles.flash}>
                <IconFlash />
            </View>
            
            <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.nameText}>{props.nameCharging}</Text>
                <Text style={styles.textTime}>22/09/2023</Text> 
            </View>
            
            <View style={[styles.ingredients,{marginVertical: 10}]}>
                <Text style={styles.text}>Address : </Text>
                <Text style={styles.location} numberOfLines={2}>{props.address}</Text>
            </View> 
            
            <View style={styles.ingredients}>
                <Text style={styles.text}>Time : </Text>
                <Text style={styles.location}>{props.time}</Text>
            </View> 
            <View style={styles.ingredients}>
                <Text style={styles.text}>Total Time : </Text>
                <Text style={styles.location}>{props.totalTime}</Text>
            </View> 
           
        </View>
        </View>
    )
}

export default ChargingHistoryCard;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',  
        height: 135,
        borderWidth: 1,
        backgroundColor:'#fff',
        marginHorizontal: 16,
        borderRadius: 7,
        borderColor: '#C4C4C4',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 7,
        shadowOpacity: 0.4,
        elevation: 12,
    },
    flash: {
        flex: 0.1,
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 5,
    },
    content: {
       flex: 1, 
       marginHorizontal: 5,  
    },
    nameText: {
        fontSize: 16,
        color: '#0C2964',
        fontWeight: '500',
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    text: {
        fontSize: 12,
        color: '#0C2964',
        flex:0.3,
    },
    location: { 
        flex: 0.8,
        fontSize: 12,
        color: '#000',
        paddingHorizontal: 10,
    },
    ingredients: {
        flexDirection:'row',
        alignItems: 'center',
        marginVertical: 5,
        
    },
    textTime: {
        color: '#3976F2',
        fontSize:12,
    }
})