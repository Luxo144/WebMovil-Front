import React, { FC, useState,useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Loader ,Button} from '../../components';
import { login, verifyToken } from '../../services/auth/auth.services';
import { StackScreenProps } from '@react-navigation/stack';
import {AuthStackParamList} from '../../../ParamLists'
import AuthContext from '../../navigation/AuthContext';
import Toast from 'react-native-toast-message';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getToken } from '../../services/token.service';

type Props = StackScreenProps<AuthStackParamList,"LoginScreen">;

const LoginScreen: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
 
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const verificarTokenAlCargar = async () => {
      try {
        const token = await getToken();

        if (token) {
          const response = await verifyToken(token);
          console.log(response);
          if (response){
            setUser(true);
          }

          
        } else {
        }
      } catch (error) {
        console.error('Error al verificar el token al cargar la aplicación:', error);
      }
    };

    verificarTokenAlCargar();
  }, []);



  const isValidPassword = (password: string) => {
    
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor, ingresa tu correo electrónico y contraseña.'
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
      const response = await login({ email, password });
      console.log(response);
      Toast.show({
        type: 'success',
        text1: 'Operacion exitosa',
        text2: 'Inicio de sesión exitoso.'
      }); 
      // - Guardar el token en el almacenamiento local.
      setUser(true);
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      console.log("response", );
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Hubo un error al intentar iniciar sesión. Por favor, revisa tus credenciales.'
      });
    } finally{
      setLoading(false);
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
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.linkHighlight}>Registrate aqui</Text>
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={() => navigation.navigate('PassRecScreen')}>
          <Text style={styles.linkHighlight}>Recupera tu contraseña</Text>
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