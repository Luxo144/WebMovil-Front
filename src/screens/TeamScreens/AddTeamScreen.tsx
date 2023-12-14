import React, {FC, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import Toast from 'react-native-toast-message';
import { getToken } from '../../services/token.service';
import { createTeam } from '../../services/team/team.service';

type Props = StackScreenProps<TeamStackParamList,"AddTeamScreen">

const AddTeamScreen:FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const handleAdd = async () => {
    if (name.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El nombre del equipo debe tener al menos 6 caracteres.'
      });
      return;
    }

    if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor, ingrese una descripción para el equipo.'
      });
      return;
    }

    try {
      const token = await getToken();
      if (token) {
        const teamData = { name, description };
        const response = await createTeam(teamData, token);

        if ('error' in response) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No se pudo crear el equipo.'
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Éxito',
            text2: 'Equipo creado exitosamente.'
          });
          navigation.goBack();
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudo obtener el token de autenticación.'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ha ocurrido un error al crear el equipo.'
      });
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre del Equipo"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        style={styles.input}
      />
      <Button title="Añadir Equipo" onPress={handleAdd} />
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
});

export default AddTeamScreen;
