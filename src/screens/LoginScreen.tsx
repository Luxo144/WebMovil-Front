import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Input, Button } from '../components';


const LoginScreen: FC = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text> Login Screen </Text>
      <Input placeholder='Correo Electronico' onChangeText={(text) => setEmail} />
      <Input placeholder='Contraseña' secureTextEntry onChangeText={(text) => setPassword} />
      <Button title='Ingresar' onPress={() => alert('Pressed')} />
      <View style={styles.signUpText}>
        <Text style={{marginHorizontal: 5}}>No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Sign')}>
          <Text style={{color: 'rgba(81,135,200,1)'}}>Registrate aqui</Text>
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity>
          <Text style={{color: 'rgba(81,135,200,1)'}}>Recupera tu contraseña</Text>
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
  signUpText: {
    flexDirection: 'row',
    marginVertical: 20
  }

});

export default LoginScreen;