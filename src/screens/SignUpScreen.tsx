import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../components';

const SignUpScreen:FC = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Input placeholder='Nombre' onChangeText={(text) => setName} />
      <Input placeholder='Correo Electronico' onChangeText={(text) => setEmail} />
      <Input placeholder='Contraseña' secureTextEntry onChangeText={(text) => setPassword} />
      <Button title='Registrarse' onPress={() => alert('Pressed')} />
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
