import React, { useState, useEffect ,FC} from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'

type Props = StackScreenProps<TeamStackParamList,"EditTeamScreen">


const EditTeamScreen:FC<Props> = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Suponemos que pasas el equipo a editar a través de la navegación


  const handleEdit = () => {
    
  };
  return (
    <ScrollView style={styles.container}>
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