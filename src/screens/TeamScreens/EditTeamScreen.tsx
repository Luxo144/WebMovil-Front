import React, { useState, useEffect ,FC} from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import useIdStore from '../../services/useIdStore';
import Toast from 'react-native-toast-message';
import { getToken } from '../../services/token.service';
import { updateTeam } from '../../services/team/team.service';
import { Loader } from '../../components';

type Props = StackScreenProps<TeamStackParamList,"EditTeamScreen">


const EditTeamScreen:FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const teamId = useIdStore(state => state.teamId);
  const [loading, setLoading] = useState(false);


  const handleEdit = async  () => {
    if (name.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Validación',
        text2: 'El nombre del equipo debe tener al menos 6 caracteres.'
      });
      return;
    }
  
    if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Validación',
        text2: 'Por favor, ingrese una descripción para el equipo.'
      });
      return;
    }
    setLoading(true); // Activa el indicador de carga
    const token = await getToken();
    if (token && teamId) {
      const teamData = { idTeam: teamId, name, description };
      const response = await updateTeam(teamData, token);
      console.log(response);
      if ('error' in response) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error.message || 'Error al actualizar el equipo.'
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: 'Equipo actualizado con éxito.'
        });
        
      }
      navigation.goBack();  
    }
    setLoading(false);
  };
  return (
    <ScrollView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.inputContainer}>
        <Icon name="account-group" size={30} style={styles.icon} />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nombre del equipo"
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
};

export default EditTeamScreen;

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