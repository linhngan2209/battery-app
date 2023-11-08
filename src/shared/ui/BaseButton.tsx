import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar, 
  Dimensions,
  TextInput,
  ViewStyle, 
  TextStyle,
  Text
} from 'react-native';

type BaseButtonProps = {
    containerStyle: ViewStyle;
    title: String;
    titleStyle?: TextStyle;
    action?:any;
}
const BaseButton = (props: BaseButtonProps) => {
    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]}
                            onPress={props.action}>
            <Text style={[props.titleStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default BaseButton;

const styles = StyleSheet.create({
    container: {
     justifyContent: 'center',
     alignItems : 'center',
    },
    
});