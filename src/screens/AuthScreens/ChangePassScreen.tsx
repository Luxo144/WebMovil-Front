import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Input, Button , Loader} from '../../components'; // Asumiendo que tienes estos componentes
//import { PasswordResetCode } from '../../types/user';
import { resetPassword, resetPasswordLogin } from '../../services/auth.services';
import { StackScreenProps } from '@react-navigation/stack';
import {AuthStackParamList} from '../../../ParamLists';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<AuthStackParamList,"ChangePassScreen">;

const ChangePassScreen: FC<Props> = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidPassword = (password: string) => {
    // Ejemplo: Validar que la contraseña tenga al menos 6 caracteres
    return password.length >= 6;
  };

  const handlePasswordReset = async () => {

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Las contraseñas no coinciden.'
      }); 
      return;
    }
    if(!code || !newPassword || !confirmPassword){
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Llene los campos'
      }); 
      return;
    }

    if (!isValidPassword){
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'La contraseña debe tener al menos 6 caracteres.'
      });
      return;
    }
    /*
    try {
      setLoading(true);
      console.log("code",code)
      console.log("newPass:", newPassword)
      //crear un objeto de tipo PasswordResetCode
      const codeObj: PasswordResetCode = {
        token: code,
        newPassword: newPassword
      }
      const response = await resetPassword(codeObj);
      Toast.show({
        type: 'succes',
        text1: 'Exito',
        text2: 'Contraseña cambiada correctamente.'
      }); 
      navigation.navigate('LoginScreen'); // Redirige al usuario al Login
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Hubo un problema al cambiar la contraseña.'
      }); 
      
    } finally{
      setLoading(false);
    }
 */
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>

      <Input
        placeholder="Código de Verificación"
        onChangeText={setCode}
        value={code}
      />
      <Input
        placeholder="Nueva Contraseña"
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
      />
      <Input
        placeholder="Confirmar Nueva Contraseña"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      <Button title="Cambiar Contraseña" onPress={handlePasswordReset} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backToLogin}>Volver al inicio de sesión</Text>
      </TouchableOpacity>

      {loading && <Loader />}


    </View>
  );
};

export default ChangePassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backToLogin: {
    marginTop: 15,
    color: 'blue',
  },
});

