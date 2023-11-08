
import { View,  StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../shared/ui/Header';
import BaseTextInput from '../../shared/ui/BaseTextInput';
import IconSearch from '../../shared/icons/ic_search.svg';
import ChargingCard from './components/ChargingCard';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { getAllStation } from '../../api/stationApi';
import { ChargingStation } from '../../data/models/station';
import axios from 'axios';

const ChargingStationScreen = ({navigation} : any) => {
  const [searchText, setSearchText] = useState('')
  const [dataStation, setDataStation] = useState<ChargingStation[]>([])
  
  const handleNav = (bookedPosition: number[], totalSlots: number, stationName: string) => {
    navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_BOOKING_SELECTION,
                                                params: { bookedPosition: bookedPosition, totalSlots: totalSlots, stationName: stationName}}))
  }
  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack)
  }
 
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const result = await getAllStation();
          setDataStation(result);
        } catch (error) {
          console.log("Error fetching data: ", error);
        }
      };
      fetchData();
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
        <Header title='Charging Stations' handleNav={handleBack}/>
        <View style={styles.search}>
        <BaseTextInput 
            placeholder={'Search'}
            boxstyle={styles.box}
            onChangeText={(text) => setSearchText(text)}
            rightIcon={<IconSearch />}
                />
        </View>
        <ScrollView>
            {dataStation?.map((item : ChargingStation) => 
                 <ChargingCard 
                 key={item._id}
                 nameCharging={item.stationName}
                 location={item.location}
                 open={item.operatingHours}
                 totalSlots={item.totalSlots}
                 filledSlots={item.filledSlots}
                 bookedPosition={item.bookedPosition}
                 distance='7km'
                 handleNav={() =>handleNav(item.bookedPosition, item.totalSlots, item.stationName)}
             />)}       
        </ScrollView>
        
    </View>
  );
};

export default ChargingStationScreen;

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