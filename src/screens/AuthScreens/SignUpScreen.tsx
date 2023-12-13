import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button, Loader } from '../../components';
import { register } from '../../services/auth/auth.services';
import { StackScreenProps } from '@react-navigation/stack';
import {AuthStackParamList} from '../../../ParamLists';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<AuthStackParamList,"SignUpScreen">;

const SignUpScreen:FC<Props> = ({navigation}) => {
  const [name, setNameRegistro] = useState("");
  const [email, setEmailRegistro] = useState("");
  const [password, setPasswordRegistro] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    // Ejemplo: Validar que la contraseña tenga al menos 6 caracteres
    return password.length >= 6;
  };
  

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Campos requeridos, Todos los campos son obligatorios.'
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
    if (!isValidPassword(password)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'La contraseña debe tener al menos 6 caracteres.'
      });
      return;
    }

    try {
      setLoading(true);
      const user = await register({ first_name: name, email, password });
      console.log(user);
      navigation.navigate('LoginScreen')
      Toast.show({
        type: 'succes',
        text1: 'Registro Exitoso',
        text2: 'Te has registrado correctamente.'
      });     
    } catch (error) {
      console.error('Error al intentar registrarse:', error);
      Toast.show({
        type: 'succes',
        text1: 'Error',
        text2: 'Hubo un error al intentar registrarse.'
      });   
    } finally{
      setLoading(false);
    }

  };

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Input placeholder='Nombre' onChangeText={(text) => setNameRegistro(text)} />
      <Input placeholder='Correo Electronico' onChangeText={(text) => setEmailRegistro(text)} />
      <Input placeholder='Contraseña' secureTextEntry onChangeText={(text) => setPasswordRegistro(text)} />
      <Button title='Registrarse' onPress={handleSignUp} />
      <View style={styles.loginText}>
        <Text style={{marginHorizontal: 5}}>Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{color: 'rgba(81,135,200,1)'}}>Ingresa</Text>
        </TouchableOpacity>

      </View>
      {loading && <Loader />}
    </View>
  );
};

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

export default SignUpScreen;
