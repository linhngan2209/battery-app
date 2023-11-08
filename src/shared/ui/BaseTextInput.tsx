import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar, 
  ViewStyle,
  TextInput
} from 'react-native';

type BaseTextInputProps = {
    placeholder: string,
    rightIcon?: any,
    value?: string,
    isPassword?: boolean,
    onChangeText: (text: string) => void;
    boxstyle?: ViewStyle,
    onFocus?: () => void
}
const BaseTextInput = (props: BaseTextInputProps) => {
    return (
        <View style={[styles.container, props.boxstyle]} >
            
            <TextInput 
                style={styles.textInput}
                placeholder={props.placeholder}
                secureTextEntry={props.isPassword}
                onChangeText={(text: string)=> props.onChangeText(text)}
                value={props.value}
                onFocus={props.onFocus}
                />
            {props.rightIcon}

        </View>
    )
}

export default BaseTextInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',  
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
    }
});