import React,{ FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import ProyInvitation from '../../components/proyectInvitation';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import { getAllInvitationsTeam } from '../../services/project/projectInvitation.service';
import { getToken } from '../../services/token.service';
import Toast from 'react-native-toast-message';
import useIdStore from '../../services/useIdStore';
import { InvitationProject } from '../../types/project/projectInvitation';
import { Loader } from '../../components';
import { responseInvitation } from '../../services/project/projectInvitation.service';

type Props = StackScreenProps<TeamStackParamList,"ProyInvitationScreen">

const ProyInvitationScreen: FC<Props> = () => {

    const [proyInvitations, setProyInvitations] = useState<InvitationProject[]>([]);
    const [loading, setLoading] = useState(false);
    const teamCode = useIdStore(state => state.codeTeam);

    const handleAccept = async (invId: number) => {
      setLoading(true);
      const token = await getToken();
      if (token) {
          const response = await responseInvitation({ idInvitation: invId, response: 'ACCEPTED' }, token);
          console.log(response);
          if ('error' in response) {
              Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: response.error.message || 'Error al aceptar la invitación.'
              });
          } else {
              Toast.show({
                  type: 'success',
                  text1: 'Éxito',
                  text2: 'Invitación aceptada con éxito.'
              });
              // Actualizar la lista de invitaciones
              setProyInvitations(currentInvitations => 
                  currentInvitations.filter(invitation => invitation.id !== invId)
              );
          }
      }
      setLoading(false);
  };

  const handleDecline = async (invId: number) => {
    setLoading(true);
    const token = await getToken();
    if (token) {
        const response = await responseInvitation({ idInvitation: invId, response: 'REJECTED' }, token);
        console.log(response);
        if ('error' in response) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: response.error.message || 'Error al rechazar la invitación.'
            });
        } else {
            Toast.show({
                type: 'success',
                text1: 'Éxito',
                text2: 'Invitación rechazada con éxito.'
            });
            // Actualizar la lista de invitaciones
            setProyInvitations(currentInvitations => 
                currentInvitations.filter(invitation => invitation.id !== invId)
            );
        }
    }
    setLoading(false);
};


    useEffect(() => {
      const loadInvitations = async () => {
        setLoading(true);
        const token = await getToken();
        if (token && teamCode) {
          const response = await getAllInvitationsTeam(teamCode, token);
          console.log(response);
          if (!Array.isArray(response)) {
            console.log(response);
            setLoading(false);
          } else {
            setProyInvitations(response);
            setLoading(false);
          }
        }
      };
      
      loadInvitations();
    }, [teamCode]);

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          {loading ? (
              <Loader /> // Componente de carga
          ) : proyInvitations.length > 0 ? (
              <FlatList
                  data={proyInvitations}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                      <ProyInvitation 
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

    const styles = StyleSheet.create({
      noInvitationsContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
      },
    });




export default ProyInvitationScreen;