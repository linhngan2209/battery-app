import { View, PermissionsAndroid, StyleSheet } from 'react-native';
import React, {useState, useEffect } from 'react';
import Header from '../../shared/ui/Header';
import { CommonActions } from '@react-navigation/native';
import ChargingHistoryCard from './component/ChargingHistoryCard';

const ChargingHistoryScreen = ({navigation} : any) => {
  const [searchText, setSearchText] = useState('')
  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack)
  }
  return (
    <View style={{ flex: 1 }}>
        <Header title='Charging History' handleNav={handleBack}/>
        <View style={styles.search}>
        </View>
        <View >
            <ChargingHistoryCard 
                nameCharging='VinCom Smart City'
                address='Ham B1, toa nha A, Kdt VinHome'
                time='3:00 pm - 4:00 pm'
                totalTime='01:00 hours'
            />
            <ChargingHistoryCard 
                nameCharging='VinCom Smart City'
                address='Ham B1, toa nha A, Kdt VinHome'
                time='3:00 pm - 4:00 pm'
                totalTime='01:00 hours'
            />
            
            <ChargingHistoryCard 
                nameCharging='VinCom Smart City'
                address='Ham B1, toa nha A, Kdt VinHome'
                time='3:00 pm - 4:00 pm'
                totalTime='01:00 hours'
            />
        </View>
    </View>
  );
};

export default ChargingHistoryScreen;

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        borderColor: '#C4C4C4',
        height: 40,
        marginHorizontal: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    search: {
        marginVertical: 20,
    }
})