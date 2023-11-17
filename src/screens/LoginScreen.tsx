import React, { FC, useState,useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Loader ,Button} from '../components';
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
        //props.navigation.navigate('Home')
        

      } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        Alert.alert('Error', 'Hubo un error al intentar iniciar sesión. Por favor, revisa tus credenciales.');
      } finally{
       // setLoading(false);
      }
    } else {
      Alert.alert('Campos requeridos', 'El correo electrónico y la contraseña son obligatorios.');
    }
    
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.headerText}>Iniciar Sesión</Text>
      <Input placeholder='Correo Electronico' onChangeText={setEmail} style={styles.input} />
      <Input placeholder='Contraseña' secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title='Ingresar' onPress={handleSubmit} style={styles.button}/>
      
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Sign')}>
          <Text style={styles.linkHighlight}>Registrate aqui</Text>
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={() => props.navigation.navigate('PassRec')}>
          <Text style={styles.linkHighlight}>Recupera tu contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff', 
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
  linkHighlight: {
    fontSize: 16,
    color: 'rgba(81,135,200,1)',
    textDecorationLine: 'underline', 
  },
});

export default LoginScreen;