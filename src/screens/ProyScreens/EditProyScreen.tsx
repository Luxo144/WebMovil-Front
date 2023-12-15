import React, { useState, useEffect,FC, useId } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';
import useIdStore from '../../services/useIdStore';
import { getToken } from '../../services/token.service';
import Toast from 'react-native-toast-message';
import { updateProject } from '../../services/project/project.service';

type Props = StackScreenProps<ProyStackParamList,"EditProyScreen">;



const EditProyScreen:FC<Props> = ({ navigation}) =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const projectId = useIdStore(state => state.projectId);

    const handleEdit = async () => {
      if (!name || !description) {
          Toast.show({
              type: 'error',
              text1: 'Validación',
              text2: 'Todos los campos son obligatorios.'
          });
          return;
      }

      const token = await getToken();
      if (token && projectId) {
          const projectData = {
              idProject: projectId,
              name: name,
              description: description,
          };

          const response = await updateProject(projectData, token);
          console.log(response);
          if ('error' in response) {
              Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: response.error.message || 'No se pudo actualizar el proyecto.'
              });
          } else {
              Toast.show({
                  type: 'success',
                  text1: 'Éxito',
                  text2: 'Proyecto actualizado con éxito.'
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
  };

    return (
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <Icon name="account-group" size={30} style={styles.icon} />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nombre del proyecto"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="text-short" size={30} style={styles.icon} />
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Descripción"
              style={styles.input}
            />
          </View>
          <Button title="Guardar Cambios" onPress={handleEdit} color="#4a90e2" />
        </ScrollView>
      );

}

export default EditProyScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    icon: {
      marginRight: 10,
      color: '#4a90e2',
    },
    input: {
      flex: 1,
      fontSize: 16,
    },
  });