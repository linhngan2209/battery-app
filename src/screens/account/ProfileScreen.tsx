import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'; // Sử dụng icon từ thư viện
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';

const ProfileScreen = ({navigation}: any) => {

  const handleLogout = () => {
    navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_LOGIN}))
  };
  
  const handleNav = () => {
    navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_HISTORY_CHARGING}))
}

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Hình ảnh người dùng */}
        <View style={styles.avatarContainer}>
          <Image source={{
            uri:'https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-6/327124364_1567407240388945_9115931565673963498_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHOM3Xy3qi-c4RGuGSDLwGpqvch0eL4FSqq9yHR4vgVKup8RzxF7QzrLPEGROsDWpZgmBlAwMMTQPM9ZJUM8vjp&_nc_ohc=gnPsoRZVBXsAX_7n8Ia&_nc_ht=scontent.fhan1-1.fna&oh=00_AfCO88K0RMGuEVxYTJjex-kLzfkwMsPvEfgmSN0Xrv8lJA&oe=654D2CE7'}} 
            width={100}
            height={100}
            style={{borderRadius: 50}}
            />
           
        </View>
        <Text style={styles.username}>Phan Thị Linh Ngân</Text>
        <Text style={styles.email}>nganthoi2002@email.com</Text>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
            <View style={styles.row}>
                <Icon name="person-circle-outline" size={20} style={styles.icon} />
                <Text style={styles.text}>Profile</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color={'#0C2964'}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => handleNav()}>
          <View style={styles.row}>
            <Icon name="time-outline" size={20} style={styles.icon} />
            <Text style={styles.text}>Charging History</Text>
          </View>
          <Icon name="chevron-forward-outline" size={20} color={'#0C2964'}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
            <View style={styles.row}>
                <Icon name="notifications-outline" size={20} style={styles.icon} />
                <Text style={styles.text}>Notifications</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color={'#0C2964'}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} >
          <View style={styles.row}>
            <Icon name="help-circle-outline" size={20} style={styles.icon} />
            <Text style={styles.text}>Support</Text>
          </View>
          <Icon name="chevron-forward-outline" size={20} color={'#0C2964'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => handleLogout()}>
            <View style={styles.row}>
                <Icon name="log-out-outline" size={20} style={styles.icon} />
                <Text style={styles.text}>Log out</Text>
            </View>
          <Icon name="chevron-forward-outline" size={20} color={'#0C2964'}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0C2964'
  },
  email: {
    fontSize: 14,
    color: '#0C2964',
  },
  settingsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
    marginHorizontal: 20,
  },
  settingItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10, // Border radius
    marginVertical: 15, // Vertical margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, // Decrease shadow opacity
    shadowRadius: 4,
    elevation: 4, // Android shadow
    paddingHorizontal: 10,

  },
  row: {
    flexDirection: 'row'
  },
  icon: {
   marginRight: 10,
   color: '#0C2964',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0C2964'
  }
});

export default ProfileScreen;
