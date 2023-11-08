import React, { useState, useEffect } from 'react';
import { View, Button, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

const HomeScreen = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [chargingStation, setChargingStaion] = useState([])
  
  useEffect (() => {
    const fetchChargingStation = async () => {
      try {
        const stations = await getNearByChargingStation(latitude, longitude)
        setChargingStaion(stations)
      } catch (error) {
        console.error(error)
      }
    };
    fetchChargingStation();
    }, [latitude, longitude])

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Quyền Truy Cập Vị Trí',
            message: 'Ứng dụng cần truy cập vị trí của bạn.',
            buttonNeutral: 'Hỏi Lại Sau',
            buttonNegative: 'Hủy Bỏ',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Quyền truy cập vị trí đã được cấp');
          getCurrentLocation();
        } else {
          console.log('Quyền truy cập vị trí bị từ chối');
        }
      } catch (err) {
        console.warn(err);
      }
    } 
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.warn(`Lỗi khi lấy vị trí: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  const getNearByChargingStation = async (latitude : Double, longitude: Double) => { 
      const apiKey = 'AIzaSyDf8vQZTAfi5FJ4fjRl20kZdMoWTO7mLJg'
      const keyword = 'vinfast charging station'
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${latitude},${longitude}&radius=1500&key=${apiKey}`)
      const data = await res.json();
      return data.results;
    }
  
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 21.0278,
          longitude: 105.8342,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        customMapStyle={[]}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="Vị trí hiện tại"
          description="Đây là vị trí của bạn"
          pinColor='#66CCFF'
        />
        <Circle
          center={{
          latitude: latitude,
          longitude: longitude
          }}
          radius={100} 
          fillColor="rgba(0, 0, 255, 0.2)" 
          strokeColor="rgba(0, 0, 255, 0.5)" 
          />

        {chargingStation?.map(station => (
        <Marker
          key={station.place_id}
          coordinate={{
            latitude: station.geometry.location.lat,
            longitude: station.geometry.location.lng
          }}
          title={station.name}
          description={station.compound_code}
        />
  ))}
    </MapView>
      <Button title="Cập nhật vị trí" onPress={requestLocationPermission} />
    </View>
  );
};

export default HomeScreen;
