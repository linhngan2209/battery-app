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

type ChargingCardProps = {
   nameCharging: string,
   location: string,
   totalSlots: number,
   filledSlots: number,
   distance: string,
   open: string,
   bookedPosition: number[],
   handleNav: (bookedPosition: number[], totalSlots: number) => void,
}
const ChargingCard= (props: ChargingCardProps) => {
    return (
        <View style={[styles.container]} >
            <IconCharging />
            <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.nameText} numberOfLines={1}>{props.nameCharging}</Text>
                <IconLocation width={16} height={16}/>
            </View>
            <Text style={styles.place} numberOfLines={1}>{props.location}</Text>
            <View style={styles.ingredients}>
                <IconVector width={10} height={10} />
                <Text style={styles.location}>{props.distance}</Text>
            </View> 
            <View style={styles.footer}>
                <View>
                    <View style={styles.ingredients}>
                        <IconClock width={10} height={10} />
                        <Text style={styles.location}>{props.open}</Text>
                    </View> 
                    <View style={styles.ingredients}>
                        <IconChargingMini width={10} height={10}/>
                        <Text style={styles.location}>Slots: {props.filledSlots}/{props.totalSlots}</Text>
                    </View>
                </View>
                <View>
                    <BaseButton 
                        containerStyle={styles.button}
                        title={'Booking'}
                        titleStyle={styles.titleButton}
                        action={() => props.handleNav && props.handleNav(props.bookedPosition, props.totalSlots)}
                    />
                </View>
            </View>
        </View>
        </View>
    )
}

export default ChargingCard;

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
    content: {
       flex: 1,   
       paddingHorizontal: 15,
    },
    nameText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    place: {
        fontSize: 12,
        color: '#000',
        marginVertical: 2,
    },
    location: {
        fontSize: 12,
        color: '#000',
        paddingHorizontal: 10
    },
    ingredients: {
        flexDirection:'row',
        alignItems: 'center',
        marginVertical: 3
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent:'center',
        backgroundColor: '#0C2964',
        borderColor: '#0C2964',
        marginTop: 10,
    }, 
    titleButton: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    }
})