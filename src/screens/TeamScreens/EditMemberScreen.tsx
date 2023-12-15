import React, {FC, useState } from 'react';
import { View,  Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import useIdStore from '../../services/useIdStore';
import { Button } from '../../components';
import { getToken } from '../../services/token.service';
import Toast from 'react-native-toast-message';
import { updateMember } from '../../services/team/teamMember.service';

type Props = StackScreenProps<TeamStackParamList, "EditMemberScreen">;

const EditMemberScreen: FC<Props> = ({navigation}) => {
    const [selectedRole, setSelectedRole] = useState("Member");
    const userId = useIdStore(state => state.userId);
    const teamId = useIdStore(state => state.teamId);


    const handleSave = async () => {
          const token = await getToken();
          const teamId = useIdStore.getState().teamId; 
          const userId = useIdStore.getState().userId;
          console.log("teamId",teamId);
          console.log("userId",userId);
          console.log("selectedRole",selectedRole);
          if (!token || !teamId || !userId) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'No se pudo obtener el token o el id del equipo o el id del usuario.',
            });
            return;
          }
          const memberData = { idTeam: teamId, idUser: userId, newRoleName: selectedRole };
          console.log("memberData",memberData);
          const response = await updateMember(memberData, token);
          console.log(response);
          if ('error' in response) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: response.error.message || 'No se pudo actualizar el miembro.',
            });
          } else {
            Toast.show({
              type: 'success',
              text1: 'Éxito',
              text2: 'Miembro actualizado con éxito.',
            });
          }navigation.goBack();
      };

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
        <Button title= "Guardar Cambios" onPress={handleSave}/>
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