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

type Props = StackScreenProps<TeamStackParamList,"ProyInvitationScreen">

const ProyInvitationScreen: FC<Props> = () => {

    const [proyInvitations, setProyInvitations] = useState<InvitationProject[]>([]);
    const [loading, setLoading] = useState(false);
    const teamCode = useIdStore(state => state.codeTeam);

    const handleAccept = (invId:number) => {
       
    };

    const handleDecline = (invId:number) => {
        
    }

    useEffect(() => {
      const loadInvitations = async () => {
        setLoading(true);
        const token = await getToken();
        if (token && teamCode) {
          const response = await getAllInvitationsTeam(teamCode, token);
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