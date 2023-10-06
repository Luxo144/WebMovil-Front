import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../components';
import { register } from '../services/auth.services';


const SignUpScreen:FC = (props) => {
  const [name, setNameRegistro] = useState("");
  const [email, setEmailRegistro] = useState("");
  const [password, setPasswordRegistro] = useState("");

  const handleSignUp = async () => {
    if (name && email && password) {
      try {
        const user = await register({ first_name: name, email, password });
        console.log(user);
        props.navigation.navigate('Login')
        Alert.alert('Registro Exitoso', 'Te has registrado correctamente.');
      } catch (error) {
        console.error('Error al intentar registrarse:', error);
        Alert.alert('Error', 'Hubo un error al intentar registrarse.');
      }
    } else {
      Alert.alert('Campos requeridos', 'Todos los campos son obligatorios.');
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
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: 'rgba(81,135,200,1)'}}>Ingresa</Text>
        </TouchableOpacity>

      </View>
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
