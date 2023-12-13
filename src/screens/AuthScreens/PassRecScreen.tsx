import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button ,Loader} from '../../components';
import { requestPasswordReset } from '../../services/auth/auth.services';
import { StackScreenProps } from '@react-navigation/stack';
import {AuthStackParamList} from '../../../ParamLists';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<AuthStackParamList,"PassRecScreen">;

const PassRecScreen:FC<Props> = ({navigation}) => {
    const [email, setEmailRecovery] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handlePasswordRecovery = async () => {

      if (!email) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Por favor, introduce tu correo electrónico.'
        });
        return;
      } 
      
      if (!isValidEmail(email)) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Por favor, ingresa un correo electrónico válido.'
        });
        return;
      }

        try {
          setLoading(true);
          const response = await requestPasswordReset({ email });
          if ('error' in response){
            throw new Error;
          } else{
            navigation.navigate('ChangePassScreen')
            Toast.show({
              type: 'info',
              text1: 'Error',
              text2: 'Por favor, revisa tu correo electrónico para las instrucciones de recuperación.'
            });
          }

        } catch (error) {

            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Error al intentar recuperar la contraseña. Inténtalo de nuevo más tarde.'
            });
          
        } finally{
          setLoading(false);
        }
        


      
    };
    
    return (
        <View style={styles.container}>
          <Text>Pass</Text>          
          <Input placeholder='Correo Electronico' onChangeText={(text) => setEmailRecovery(text)} />
          <Button title='Recuperar' onPress={handlePasswordRecovery} />
          {loading && <Loader />}

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

