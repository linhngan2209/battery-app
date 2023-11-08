
import { View, Linking, StyleSheet, Text, Button, TouchableOpacity, Modal } from 'react-native';
import React, {useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../shared/ui/Header';
import IconChargingCar from '../../shared/icons/ic_chargingCar.svg';
import IconTimer from '../../shared/icons/ic_timer.svg';
import { CommonActions } from '@react-navigation/native';
import IconSuccess from '../../shared/icons/ic_success.svg';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { WebView } from 'react-native-webview';
import { postStatusCharging } from '../../api/stationApi';


const ChargingScreen = ({navigation}: any) => {
  const [startTime, setStartTime] = useState(0); 
  const [endTime, setEndTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0); 
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const [modalVisible, setModalVisible] = useState(false)
  const handlePostStatusChargingOn = async (status: string, phoneNumber: string, time: string, aboutTime: number) => {
        await postStatusCharging(status, phoneNumber, time, aboutTime )
  }
  
  const handlePostStatusChargingOff = async (status: string, phoneNumber: string, time: string, aboutTime: number) => {
    await postStatusCharging(status, phoneNumber, time, aboutTime )
}
  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack)
  }
  const handleNavBack = () => {
    navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_CHARGING}))
  }
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const secs = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startClock = () => {
    setIsRunning(true);
    setStartTime(Date.now()); 
    handlePostStatusChargingOn('on', '0885895674', new Date(Date.now()).toLocaleString(), 0)
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const showModal = () => {
    setTimeout(() => {
      setModalVisible(true)
    }, 1000)
  }
  
  const stopClock = () => {
    setIsRunning(false);
    setEndTime(Date.now()); 
    setTotalTime(seconds); 
    clearInterval(timerRef.current);
    showModal()
    handlePostStatusChargingOff('off','0885895674', new Date(Date.now()).toLocaleString(), seconds)
  };
  return (
    <View style={styles.container}>
        <Header 
            title='Charging Status'
            handleNav={handleBack}
        />
        <View style={styles.content}>
            <IconChargingCar style={styles.icon}/>
            <View style={styles.clock}>
            <View style={styles.clockStart}>
            <IconTimer width={20} height={20} style={{ marginVertical: 15 }} />
            <Text style={styles.clockText}>{startTime ? new Date(startTime).toLocaleTimeString() : 'Start Time'}</Text>
          </View>
          <View style={styles.clockStart}>
            <IconTimer width={20} height={20} style={{ marginVertical: 15 }} />
            <Text style={styles.clockText}>{endTime ? new Date(endTime).toLocaleTimeString() : 'End Time'}</Text>
          </View>
              </View>
            <View style={styles.footer}> 
                <TouchableOpacity style={styles.buttonStart} onPress={isRunning ? stopClock : startClock}>
                    <Text style={styles.titleStart}>{isRunning ? 'Done' : 'Start'}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerModal}>
              <IconSuccess />
              <Text style={styles.modalText}> Charging Success</Text>
            </View>
            <View style={styles.contentModal}>
            <Text style={styles.startText}>Start Time: </Text>
            <Text style={styles.timeText}>{new Date(startTime).toLocaleString()}</Text>
            <Text style={styles.startText}>End Time: </Text>
            <Text style={styles.timeText}>{new Date(endTime).toLocaleString()}</Text>
            <Text style={styles.startText}>Total Time: </Text>
            <Text style={styles.timeText}>{formatTime(totalTime)}</Text>
            <View style={{marginHorizontal: 50, marginVertical: 30, borderRadius: 10}}>
            <Button title="Close" color={'#0C2964'} onPress={() => { setModalVisible(false) 
                                                                    handleNavBack()
                                                                    }} />
            </View>
            </View>
           
          </View>
        </View>
      </Modal>
    </View>
  )
};

export default ChargingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center'
  },

  clockText: {
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    color: '#0C2964',
  },
  clockStart:  {
    alignItems: 'center'
  },
  clock: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around'
  },
  buttonStart: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#F39404',
    backgroundColor: '#F39404',
    justifyContent:'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  titleStart: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '75%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginVertical: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0C2964',
  },
  contentModal: {
    borderTopWidth: 2,
    borderStyle: 'dotted',
    borderColor: '#000 60%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  startText: {
    color: '#0C2964',
    fontSize: 12,
    marginVertical: 10
  },
   headerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
   },
   timeText: {
    color: '#0C2964',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 15,
   },
   button: {
    backgroundColor: '#0C2964'
   }
})