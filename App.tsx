import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { NAVIGATIONS_ROUTE } from "./src/navigation/Routes";
import SplashScreen from "./src/screens/login/SplashScreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import ChargingStationScreen from "./src/screens/charging/ChargingStation";
import SelectionBooking from "./src/screens/reservation/SelectionBooking";
import ChargingScreen from "./src/screens/reservation/Chargingcreen";
import PaymentScreen from "./src/screens/payment/PaymentScreen";
import BottomNavigation from "./src/navigation/bottomNavigation/BottomNavigation";
import ChargingHistoryScreen from "./src/screens/account/ChargingHistory";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATIONS_ROUTE.SCREEN_SPLASH} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION} component={BottomNavigation} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_LOGIN} component={LoginScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SPLASH} component={SplashScreen} />
        {/* <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_HOME} component={HomeScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_CHARGING} component={ChargingStationScreen} /> */}
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_BOOKING_SELECTION} component={SelectionBooking} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_CHARGING_CAR} component={ChargingScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_HISTORY_CHARGING} component={ChargingHistoryScreen} /> 

      </Stack.Navigator>

    </NavigationContainer>

  )
}