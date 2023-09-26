import React, { FC } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get('screen');

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

const Input: FC<Props> = (props) => {
    return (
        <View style={styles.container} >
            <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText}></TextInput>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        backgroundColor: '#e3e3e3',
        alignSelf: 'center',
        borderRadius: 5
    },
    input: {
        padding: 15
    }
})
