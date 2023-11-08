import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native';
import IconCar from '../../shared/icons/ic_car.svg';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import IconBack from '../../shared/icons/ic_left.svg'
import { postBookingStation } from '../../api/bookingApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectionBooking = ({navigation, route} : any) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<boolean>(false)
  const bookedPosition =route.params?.bookedPosition;
  const totalSlots= route.params?.totalSlots;
  const stationName = route.params?.stationName;
  const data: number[] = Array.from({ length: totalSlots }, (_, index) => index + 1);
  const [checkBooking, setCheckBooking] = useState<boolean>(false);

  const retrieveData = async () => {
    try {
      const storedCheck = await AsyncStorage.getItem('check');
      if (storedCheck !== null) {
        setCheckBooking(false);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []); 
 
  const storeData = async (key: string, value: string | number | boolean) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
    }
  };
  const toggleStatus = (item: number) => {
    const checkToggle = Array.isArray(bookedPosition) && bookedPosition.includes(item)
    if (checkToggle) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }


  const postBookingCharging = async (slot: number) => {
    const phone = '0885895674'
    await postBookingStation(phone, stationName, slot)
    storeData('check', checkBooking);
    navigation.dispatch(CommonActions.navigate({name:NAVIGATIONS_ROUTE.SCREEN_CHARGING_CAR}))
  }

  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack)
}

   const renderItem = ({ item }: { item: number }) => {
    const isSelected = selected === item;
    const check = Array.isArray(bookedPosition) && bookedPosition.includes(item)
    const titleStyle = {
      fontSize: 24,
      color: isSelected ? '#03DABB' : '#fff',
      opacity: isSelected ? 1 : 0.5,
    };
    const titleBox = isSelected
      ? {
          borderColor: '#03DABB',
          borderWidth: 2,
          height: 50,
          width: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }
      : null;

    return (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="#253E39"
        onPress={() => { 
          setSelected(isSelected ? null : item)
          toggleStatus(item) 
        }}
        style={[
          styles.item,
          { borderRightWidth: item % 2 === 0 ? 0 : 1},
          { borderTopWidth: item <= 2 ? 1 : 0,}
        ]}
      >
        {!check ? (
          <View style={titleBox}>
            <Text style={titleStyle}>{item}</Text>
          </View>
        ) : (
          <View>
            <IconCar />
          </View>
        )}
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
                <TouchableOpacity onPress={() => handleBack()}>
                    <IconBack  fill={'#fff'}/>
                </TouchableOpacity>
                <View style={styles.text}>
                    <Text style={styles.textHeader}>Charging slots</Text>
                </View>
        </View>
       
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        numColumns={2} 
        contentContainerStyle={styles.flatlist}
        onEndReachedThreshold={0.5}
      />
      
        <TouchableOpacity style={styles.button} disabled={status|| selected === null || checkBooking} 
          onPress={() => { 
            if(selected !== null) 
            postBookingCharging(selected)}}>
          <LinearGradient colors={['#03CDDA', '#03DA9A']} style={styles.linear}>
            <Text style={styles.textButton}>
              {!status ? `Booking now at slot ${selected ?? 'none'}`: `Not Available` }
            </Text> 
          </LinearGradient>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#162826',
    opacity: 0.96,
  },
  header:{
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', 
    letterSpacing: 2,
},
text: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
},
  item: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#757575',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
  },
  flatlist: {
    marginHorizontal: 12,
    marginTop: 30,
    paddingBottom: 100,
  },
  button: {
    height: 45,
    width: '80%',
    marginHorizontal: 40,
    borderRadius: 5,
    position: 'absolute',
    bottom: 15,
  },
  textButton: {
    color: '#182724',
    fontSize: 16,
    fontWeight: '600',
  },
  linear: {
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default SelectionBooking
