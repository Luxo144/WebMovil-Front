import React,{ FC, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text,FlatList } from 'react-native';
import { Button, Loader } from '../../components';
import TeamMember from '../../components/teamMember';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import { deleteMember, getAllMembersTeam } from '../../services/team/teamMember.service';
import { getToken } from '../../services/token.service';
import { TeamMembers } from '../../types/team/teamMember';
import useIdStore from '../../services/useIdStore';
import Toast from 'react-native-toast-message';
type Props = StackScreenProps<TeamStackParamList,"TeamMembersScreen">


const TeamMembersScreen:FC<Props> = ({navigation}) =>{

  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const teamId = useIdStore(state => state.teamId);
  const [loading, setLoading] = useState(false);
    const handleEdit = (memberId: number) => {
      
    }
    const handleDelete = async (memberId: number) => {
      setLoading(true);
      const token = await getToken();
      const teamId = useIdStore.getState().teamId; // Asumiendo que tienes el teamId en la tienda
  
      if (token && teamId) {
        const memberData = { idTeam: teamId, idUser: memberId };
        const response = await deleteMember(memberData, token);
        console.log(response);
        if ('error' in response) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: response.error.message || 'Error al eliminar el miembro.'
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Éxito',
            text2: 'Miembro eliminado con éxito.'
          });
          // Actualizar la lista de miembros del equipo
          
        }
      }
      setLoading(false);
    };
  
    
    useEffect(() => {
      const loadTeamMembers = async () => {
        const token = await getToken();
        if (token && teamId) {
          const response = await getAllMembersTeam(teamId, token);
          if (!Array.isArray(response)) {
            // Manejar errores, posiblemente mostrar un mensaje
            console.log(response);
          } else {
            setTeamMembers(response);
          }
        }
      };
  
      loadTeamMembers();
    }, [teamId]);

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {loading && <Loader />} 
        <FlatList
          data={teamMembers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TeamMember
              member={item}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
        <Button title="Enviar una invitación" onPress={() => navigation.navigate('AddMemberScreen')} />
      </View>
    );
  };


export default TeamMembersScreen;