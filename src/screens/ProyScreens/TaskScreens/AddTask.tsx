import React, { useState, FC } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../../ParamLists';

type Props = StackScreenProps<ProyStackParamList,"AddTask">;

const AddStack: FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responsibleId, setResponsibleId] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleCreateTask = () => {
    // Lógica para crear la tarea
    // Por ejemplo, enviar estos datos a tu backend
    const taskData = {
      name,
      description,
      responsibleId: parseInt(responsibleId, 10), // Convertir a número
      projectId: parseInt(projectId, 10), // Convertir a número
    };

    console.log(taskData);
    // Aquí iría el código para comunicarse con el backend
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre de la Tarea:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        multiline
      />

      <Text style={styles.label}>ID del Encargado:</Text>
      <TextInput
        style={styles.input}
        value={responsibleId}
        onChangeText={setResponsibleId}
        placeholder="ID del Encargado"
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID del Proyecto:</Text>
      <TextInput
        style={styles.input}
        value={projectId}
        onChangeText={setProjectId}
        placeholder="ID del Proyecto"
        keyboardType="numeric"
      />

      <Button title="Crear Tarea" onPress={handleCreateTask} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AddStack;
