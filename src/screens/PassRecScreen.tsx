import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../components';

const PassRecScreen:FC = (props) => {
    const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
          <Text>Pass</Text>          
          
          <Input placeholder='Correo Electronico' onChangeText={(text) => setEmail} />
          <Button title='Recuperar' onPress={() => alert('Pressed')} />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginText: {
      flexDirection: 'row',
      marginVertical: 20
    }
  });

export default PassRecScreen;

