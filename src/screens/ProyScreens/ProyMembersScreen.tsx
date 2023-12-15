import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Button, Loader } from '../../components'; // Asume que tienes un componente de carga
import ProyMember from '../../components/proyMember';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';
import Toast from 'react-native-toast-message';
import useIdStore from '../../services/useIdStore';
import { getToken } from '../../services/token.service';
import { UserProject } from '../../types/project/project';
import { getTeamsOfProject, removeTeamFromProject } from '../../services/project/projectTeam.service';
import { TeamsOfProject } from '../../types/project/projectTeam';

type Props = StackScreenProps<ProyStackParamList, "ProyMembersScreen">;

const ProyMembersScreen: FC<Props> = ({ navigation }) => {
    const [proyMembers, setProyMembers] = useState<TeamsOfProject[]>([]);
    const [loading, setLoading] = useState(false);
    const projectId = useIdStore(state => state.projectId); 

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            const token = await getToken();
            if (token && projectId) {
              console.log(projectId);
                const response = await getTeamsOfProject(projectId, token);
                console.log(response);
                setLoading(false);
                if ('error' in response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: response.error.message,
                    });
                } else {
                    setProyMembers(response);
                }
            }
        };

        fetchMembers();
    }, [projectId]);

    const handleDelete = async (teamId: number) => {
      setLoading(true); // Activa el indicador de carga
      const token = await getToken();
      if (token && projectId) {
          
          const projectTeamData = { idTeam: teamId, idProject: projectId }; 
          const response = await removeTeamFromProject(projectTeamData, token);
          console.log(response);
          if ('error' in response) {
              Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: response.error.message || 'No se pudo eliminar el equipo del proyecto.'
              });
          } else {
              Toast.show({
                  type: 'success',
                  text1: 'Éxito',
                  text2: 'Equipo eliminado del proyecto con éxito.'
              });
              // Actualizar la lista de miembros del proyecto después de la eliminación
              setProyMembers(currentMembers => currentMembers.filter(member => member.id !== teamId));
          }
      } else {
          Toast.show({
              type: 'error',
              text1: 'Error de Autenticación',
              text2: 'No se pudo obtener el token de usuario.'
          });
      }
      setLoading(false); // Desactiva el indicador de carga
  };
  

  return (
    <View style={styles.container}>
        {loading ? (
            <Loader />
        ) : proyMembers.length > 0 ? (
            <FlatList
                data={proyMembers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProyMember
                        team={item}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
            />
        ) : (
            <Text style={styles.emptyMessage}>No hay equipos en este proyecto.</Text>
        )}
    </View>
);
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white'
  },
  emptyMessage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 16,
      marginTop: 50 // Ajusta este valor según sea necesario
  },
  // ...resto de tus estilos
});

export default ProyMembersScreen;