
import { View, PermissionsAndroid, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import React, {useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../shared/ui/Header';
import IconTimer from '../../shared/icons/ic_timer.svg';
import IconMer from '../../shared/icons/ic_mer.svg'
import BaseButton from '../../shared/ui/BaseButton';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { postPayment } from '../../api/payment';
import { formatTime } from '../../utils/formatTime';


const PaymentScreen = ({navigation} : any) => {
  const [data, setData] = useState({})
  const phoneNumber = '0885895674'
  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack)
  }
  useFocusEffect(
    useCallback(() => {
      const fetchData = async (phoneNumber: string) => {
        try {
          const result = await postPayment(phoneNumber);
          setData(result);
        } catch (error) {
          console.log("Error fetching data: ", error);
        }
      };
      fetchData(phoneNumber);
    }, [])
  );

  return (
    <View style={styles.container}>
        <Header 
            title='Payment'
            handleNav={handleBack}
        />
       <View style={styles.content}>
           <IconMer width={300} height={300}/>
           <IconTimer />
           <View style={styles.time}>
            <Text style={styles.timeText}>{formatTime(data?.totalTime)}</Text>
            </View>
            </View>
            <View style={styles.fee}>
              <Text style={styles.text}>Charging Fee</Text>
              <Text style={styles.textPrice}>{data?.price} USD</Text>
            </View>
            <View style={styles.fee}>
              <Text style={styles.text}>Total Fee</Text>
              <Text style={styles.textPrice}>{data.walletBalance}</Text>
            </View>
            <View style={styles.wallet}>
            <View style={styles.feeFooter}>
              <Text style={styles.text}>Wallet Balance</Text>
              <Text style={styles.textPrice}> {data.walletBalance} USD</Text>
            </View>
            </View>
            <View style={styles.footer}>
              <BaseButton 
                title={'Proceed To Pay'}
                containerStyle={styles.btn}
                titleStyle={styles.btnText}
        
              />
            </View>
       
    </View>
  )
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center'
  },
  
  time: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    marginVertical: 15,
  },
  timeText: {
    color: '#0C2964',
    fontWeight: '500'
  }, 
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0C2964'
  },
  textPrice: {
    fontSize: 15,
    color: '#F39404',
    fontWeight: '700',
  }, 
  fee: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  wallet: {
    marginVertical: 10,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderColor: '#C4C4C4',
    borderRadius: 5,
  },
  feeFooter: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 5,
  },
  btn: {
    height: 40,
    width: 200,
    borderWidth: 1,
    backgroundColor: '#0C2964',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }, 
  footer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  }
})