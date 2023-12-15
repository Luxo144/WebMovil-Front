import React, { useState, FC } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ProyStackParamList } from '../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from '../../components';
import useIdStore from '../../services/useIdStore';
import { getToken } from '../../services/token.service';
import Toast from 'react-native-toast-message';
import { createInvitation } from '../../services/project/projectInvitation.service';

type Props = StackScreenProps<ProyStackParamList,"InvTeamScreen">

const InvTeamScreen: FC<Props> = ({navigation}) => {
    const [teamCode, setTeamCode] = useState('');
    const [loading, setLoading] = useState(false);
    const projectId = useIdStore(state => state.projectId); 




    const handleInvitation = async () => {
      setLoading(true); 
      try {
        const token = await getToken();
        if (!token || !projectId || !teamCode) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Por favor complete todos los campos requeridos.'
          });
        } else {
          const invitationData = {
            idProject: projectId,
            codeTeam: teamCode,
          };
  
          const response = await createInvitation(invitationData, token);
          if ('error' in response) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: response.error.message
            });
          } else {
            Toast.show({
              type: 'success',
              text1: 'Éxito',
              text2: 'Invitación enviada con éxito.'
            });
            navigation.goBack();
          }
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Ha ocurrido un error inesperado.'
        });
      } finally {
        setLoading(false); 
      }
    };






    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingrese el código del equipo:</Text>
        <TextInput
          style={styles.input}
          value={teamCode}
          onChangeText={setTeamCode}
          placeholder="Código del equipo"
          keyboardType="default" 
        />
        <Button title= "Enviar invitación" onPress={handleInvitation}/>   
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
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      width: '80%',
      marginBottom: 20,
    },

  });
  
  export default InvTeamScreen;
  