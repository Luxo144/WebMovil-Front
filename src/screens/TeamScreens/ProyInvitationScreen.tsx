import React,{ FC, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import ProyInvitation from '../../components/proyectInvitation';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'

type Props = StackScreenProps<TeamStackParamList,"ProyInvitationScreen">

const ProyInvitationScreen: FC<Props> = () => {

    const [proyInvitations, setProyInvitations] = useState([
        { id: '1', proyId: 'Proyecto A', invitedTeamId: '1', status: 'Pendiente', invitationDate:'01-01-2023' },
        { id: '2', proyId: 'Proyecto B', invitedTeamId: '2', status: 'Rechazada', invitationDate:'01-01-2023' },
      ]);

    const handleAccept = (invId:string) => {
        setProyInvitations(proyInvitations.filter(inv => inv.id !== invId));
    };

    const handleDecline = (invId:string) => {
        setProyInvitations(proyInvitations.filter(inv => inv.id !== invId));
    }

    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={proyInvitations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProyInvitation inv={item}
          onAccept={handleAccept}
          onDecline={handleDecline}  
          />}
          
        />
      </View>
    );
}






export default ProyInvitationScreen;