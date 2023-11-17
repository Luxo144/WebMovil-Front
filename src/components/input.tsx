import React, { FC } from "react";
import { Dimensions, View, StyleSheet,TextStyle } from "react-native";
import { TextInput} from "react-native";

const { height, width } = Dimensions.get('screen');

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: TextStyle;
    value?: string;
}

const Input: FC<Props> = (props) => {
    return (
        <View style={[styles.container, props.style]} >
            <TextInput
             style={styles.input} 
             placeholder={props.placeholder} 
             secureTextEntry={props.secureTextEntry} 
             onChangeText={props.onChangeText}
             value={props.value}  >
             </TextInput>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        backgroundColor: '#e3e3e3',
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10
    },
    input: {
        padding: 15
    }
})
