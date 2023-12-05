import React, {FC, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'

type Props = StackScreenProps<TeamStackParamList,"AddMemberScreen">

const AddMemberScreen:FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');

  const handleAdd = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Correo del integrante"
        style={styles.input}
        
      />
      <Picker        
        selectedValue={role}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
        >
          <Picker.Item label="Member" value="Member" />
          <Picker.Item label="Owner" value="Owner" />
          <Picker.Item label="Developer" value="Developer" />
      </Picker>
      <Button title="Añadir Integrante" onPress={handleAdd} />
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

export default AddMemberScreen;
