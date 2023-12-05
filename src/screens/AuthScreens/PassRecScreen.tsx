import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../../components';
import { requestPasswordReset } from '../../services/auth.services';
import { StackScreenProps } from '@react-navigation/stack';
import {AuthStackParamList} from '../../../ParamLists';

type Props = StackScreenProps<AuthStackParamList,"PassRecScreen">;

const PassRecScreen:FC<Props> = ({navigation}) => {
    const [email, setEmailRecovery] = useState("");

    const handlePasswordRecovery = async () => {
      if (email) {
        try {
          await requestPasswordReset({ email });
          navigation.navigate('ChangePassScreen')
          alert('Por favor, revisa tu correo electrónico para las instrucciones de recuperación.');
        } catch (error) {
          console.error('Error al intentar recuperar la contraseña:', error);
          
          const errMessage = (error as Error).message; // Aserción de tipo
    
          if (errMessage === 'User not found') {
            alert('No se encontró un usuario con ese correo electrónico.');
          } else {
            alert('Error al intentar recuperar la contraseña. Inténtalo de nuevo más tarde.');
          }
        }
      } else {
        alert('Por favor, introduce tu correo electrónico.');
      }
    };
    
    return (
        <View style={styles.container}>
          <Text>Pass</Text>          
          <Input placeholder='Correo Electronico' onChangeText={(text) => setEmailRecovery(text)} />
          <Button title='Recuperar' onPress={handlePasswordRecovery} />
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

