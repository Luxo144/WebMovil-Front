import React, { FC, useState,useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button, Loader } from '../components';
import { login } from '../services/auth.services';
import AuthContext from '../navigation/AuthContext';

const LoginScreen: FC = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
 

  const handleSubmit = async () => {
    if (email && password) { 
      try {
        //setLoading(true);

        const response = await login({ email, password });
        console.log(response); 
        Alert.alert('Éxito', 'Inicio de sesión exitoso.');
        // - Guardar el token en el almacenamiento local.

        setUser(true);
        

      } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        Alert.alert('Error', 'Hubo un error al intentar iniciar sesión. Por favor, revisa tus credenciales.');
      } finally{
        setLoading(false);
      }
    } else {
      Alert.alert('Campos requeridos', 'El correo electrónico y la contraseña son obligatorios.');
    }
    
  };

  return (
    
    <View style={styles.container}>
      <Text> Login Screen </Text>
      <Input placeholder='Correo Electronico' onChangeText={(text) => setEmail(text)} />
      <Input placeholder='Contraseña' secureTextEntry onChangeText={(text) => setPassword(text)} />
      <Button title='Ingresar' onPress={handleSubmit} />
      
      <View style={styles.signUpText}>
        <Text style={{marginHorizontal: 5}}>No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Sign')}>
          <Text style={{color: 'rgba(81,135,200,1)'}}>Registrate aqui</Text>
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={() => props.navigation.navigate('PassRec')}>
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