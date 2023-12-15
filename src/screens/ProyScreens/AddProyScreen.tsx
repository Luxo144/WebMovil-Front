import React, { FC, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';
import { createProject } from '../../services/project/project.service';
import { getToken } from '../../services/token.service';
import Toast from 'react-native-toast-message';
import { Loader } from '../../components';
import useIdStore from '../../services/useIdStore';
type Props = StackScreenProps<ProyStackParamList,"AddProyScreen">;

const AddProyScreen: FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name || !description) {
      Toast.show({
        type: 'error',
        text1: 'Validación',
        text2: 'Todos los campos son obligatorios.'
      });
      return;
    }

    setLoading(true);
    const token = await getToken();
    if (token) {
      const projectData = {
        name: name,
        description: description,
      };

      const response = await createProject(projectData, token);

      if ('error' in response) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error.message || 'No se pudo crear el proyecto.'
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: 'Proyecto creado con éxito.'
        });
        navigation.goBack();
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error de Autenticación',
        text2: 'No se pudo obtener el token de usuario.'
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />} 
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre del Proyecto"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        style={styles.input}
      />
      <Button title="Crear Proyecto" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 16,
  },
  // Añade aquí otros estilos si es necesario
});

export default AddProyScreen;
