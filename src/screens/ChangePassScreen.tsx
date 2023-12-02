import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Input, Button } from '../components'; // Asumiendo que tienes estos componentes
import { PasswordResetCode } from '../types/user';
import { resetPassword, resetPasswordLogin } from '../services/auth.services';


const ChangePassScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    try {
      console.log("code",code)
      console.log("newPass:", newPassword)
      //crear un objeto de tipo PasswordResetCode
      const codeObj: PasswordResetCode = {
        token: code,
        newPassword: newPassword
      }
      const response = await resetPassword(codeObj);

      Alert.alert("Éxito", "Contraseña cambiada correctamente.");
      navigation.navigate('Login'); // Redirige al usuario al Login
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al cambiar la contraseña.");
    }
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

