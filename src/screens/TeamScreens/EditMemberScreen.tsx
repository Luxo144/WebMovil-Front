import React, {FC, useState } from 'react';
import { View,  Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import useIdStore from '../../services/useIdStore';

type Props = StackScreenProps<TeamStackParamList, "EditMemberScreen">;

const EditMemberScreen: FC<Props> = () => {
    const [selectedRole, setSelectedRole] = useState("");
    

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seleccione Rol:</Text>
        <Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue) => setSelectedRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Member" value="Member" />
          <Picker.Item label="Developer" value="Developer" />
        </Picker>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      picker: {
        width: 250,
        height: 50,
        marginBottom: 20,
      },
  });
  
  export default EditMemberScreen;