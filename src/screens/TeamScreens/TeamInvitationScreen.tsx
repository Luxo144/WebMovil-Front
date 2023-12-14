import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TeamInvitation from '../../components/teamInvitation';
import { StackScreenProps } from '@react-navigation/stack';
import { TeamStackParamList } from '../../../ParamLists';
import { getToken } from '../../services/token.service';
import { acceptInvitation, getAllInvitationsOfUser, rejectInvitation } from '../../services/team/invitationTeam.service';
import { GetInvitationsResponse } from '../../types/team/invitationTeam';
import Toast from 'react-native-toast-message';
import Loader from '../../components/loader';
type Props = StackScreenProps<TeamStackParamList, "TeamInvitationScreen">

const TeamInvitationScreen: FC<Props> = () => {
  const [teamInvitations, setTeamInvitations] = useState<GetInvitationsResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInvitations = async () => {
      setLoading(true);
      const token = await getToken();
      if (token) {
        const response = await getAllInvitationsOfUser(token);
        console.log(response);
        if (Array.isArray(response)) {
          setTeamInvitations(response);
        } else {

          console.log('Error al obtener invitaciones:', response);
        }
      }
      setLoading(false);
    };

    loadInvitations();
  }, []);

  const handleAccept = async (invId: number) => {
    setLoading(true);
    const token = await getToken();
    if (token) {
        const response = await acceptInvitation(invId, token);
        if ('error' in response) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No se pudo aceptar la invitación.'
            });
        } else {
            setTeamInvitations(prevInvitations => 
                prevInvitations.filter(inv => inv.id !== invId)
            );
            Toast.show({
                type: 'success',
                text1: 'Éxito',
                text2: 'Invitación aceptada con éxito.'
            });
        }
    }
    setLoading(false);
};

const handleDecline = async (invId: number) => {
    const token = await getToken();
    if (token) {
        const response = await rejectInvitation(invId, token);
        if ('error' in response) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No se pudo rechazar la invitación.'
            });
        } else {
            setTeamInvitations(prevInvitations => 
                prevInvitations.filter(inv => inv.id !== invId)
            );
            Toast.show({
                type: 'success',
                text1: 'Éxito',
                text2: 'Invitación rechazada con éxito.'
            });
        }
    }
};

return (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
      {loading ? (
          <Loader /> // Componente de carga
      ) : teamInvitations.length > 0 ? (
          <FlatList
              data={teamInvitations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                  <TeamInvitation 
                      inv={item}
                      onAccept={() => handleAccept(item.id)}
                      onDecline={() => handleDecline(item.id)}
                  />
              )}
          />
      ) : (
          <View style={styles.noInvitationsContainer}>
              <Text>No tienes invitaciones pendientes.</Text>
          </View>
      )}
  </View>
);
};

export default TeamInvitationScreen;

const styles = StyleSheet.create({
  noInvitationsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
});