import React, {FC, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddTeamScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    // Aquí podrías llamar a una API para añadir el equipo.
    // Por simplicidad, asumiremos que se agregó correctamente y volveremos a la pantalla anterior.
    navigation.goBack();
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
