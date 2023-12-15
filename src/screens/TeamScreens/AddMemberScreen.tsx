import React, {FC, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import useIdStore from '../../services/useIdStore';
import { createInvitation } from '../../services/team/invitationTeam.service';
import { getToken } from '../../services/token.service';
import Toast from 'react-native-toast-message';
import { Loader } from '../../components';

type Props = StackScreenProps<TeamStackParamList, "AddMemberScreen">;

const AddMemberScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [loading, setLoading] = useState(false);
  const teamId = useIdStore(state => state.teamId);
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleAdd = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor, ingrese un correo electrónico.'
      });
      return;
    }
    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor, ingrese un correo electrónico válido.'
      });
      return;
    }

    const token = await getToken();

    if (token && teamId) {
      setLoading(true);
      const invitationData = {
        teamId: teamId,
        emailInvitedUser: email,
      };

      await createInvitation(invitationData, token);

      setLoading(false);
      Toast.show({
        type: 'info',
        text1: 'Invitación Enviada',
        text2: 'La invitación fue enviada. Si el usuario existe, recibirá la notificación.'
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Correo del integrante"
        style={styles.input}
      />
      <Picker
        selectedValue={role}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Member" value="Member" />
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