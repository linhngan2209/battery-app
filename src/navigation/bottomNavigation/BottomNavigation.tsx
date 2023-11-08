import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Father from 'react-native-vector-icons/Feather';
import HomeScreen from '../../screens/home/HomeScreen';
import ChargingScreen from '../../screens/reservation/Chargingcreen';
import ChargingStationScreen from '../../screens/charging/ChargingStation';
import PaymentScreen from '../../screens/payment/PaymentScreen';
import ProfileScreen from '../../screens/account/ProfileScreen';
import { NAVIGATIONS_ROUTE } from '../Routes';
import IconMap from '../../shared/icons/ic_map1.svg'
import IconElectric from '../../shared/icons/ic_electric1.svg'
import IconPayment from '../../shared/icons/ic_credit.svg'
import IconUser from '../../shared/icons/ic_user.svg'

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATIONS_ROUTE.SCREEN_HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F39404',
        tabBarStyle: {
            backgroundColor: '#0C2964', 
            height: 70,
            paddingVertical: 10,
            borderBottomEndRadius: 34,
            borderBottomLeftRadius: 34,
            },
        tabBarLabelStyle: {marginBottom: 10}
      }}
    >
      <Tab.Screen
        name={NAVIGATIONS_ROUTE.SCREEN_HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <IconMap color={color} fontSize={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATIONS_ROUTE.SCREEN_CHARGING}
        component={ChargingStationScreen}
        options={{
          tabBarLabel: 'Station',
          tabBarIcon: ({ color, size }) => (
            <IconElectric color={color} fontSize={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarLabel: 'Payment',
          tabBarIcon: ({ color, size }) => (
            <IconPayment color={color} fontSize={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <IconUser color={color} fontSize={size} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation