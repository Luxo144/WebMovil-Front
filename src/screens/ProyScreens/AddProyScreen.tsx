import React, {FC, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';

type Props = StackScreenProps<ProyStackParamList,"AddProyScreen">;

const AddProyScreen:FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
});

export default AddProyScreen;