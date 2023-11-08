import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput} from 'react-native';
import IconSearch from '../icons/ic_search.svg'
import IconBack from '../icons/ic_left.svg';


type HeaderProps = {
    handleNav?: () => void;
    title: string;
    
}
const Header = (props: HeaderProps) => {
   
    
    return (
        
        <View style={styles.header}>
                <TouchableOpacity onPress={props.handleNav}>
                    <IconBack  fill={'#fff'}/>
                </TouchableOpacity>
                <View style={styles.text}>
                    <Text style={styles.textHeader}>{props.title}</Text>
                </View>
        </View>
        
        
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 90,
        backgroundColor: '#0C2964',
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 20,
        borderTopLeftRadius: 34,
        borderTopRightRadius: 34,
        paddingTop: 20,
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
  
})