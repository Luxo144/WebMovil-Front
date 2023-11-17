import React,{ FC, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import TeamInvitation from '../components/teamInvitation';


const ProyectsScreen: FC = (props) => {

    const [teamInvitations, setTeamInvitations] = useState([
        { id: '1', teamId: 'Equipo A', invitedUserId: '1', status: 'Pendiente', invitationDate:'01-01-2023' },
        { id: '2', teamId: 'Equipo B', invitedUserId: '2', status: 'Rechazada', invitationDate:'01-01-2023' },
      ]);

    const handleAccept = (invId) => {
        setTeamInvitations(teamInvitations.filter(inv => inv.id !== invId));
    };

    const handleDecline = (invId) => {
        setTeamInvitations(teamInvitations.filter(inv => inv.id !== invId));
    }

    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={teamInvitations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TeamInvitation inv={item}
          onAccept={handleAccept}
          onDecline={handleDecline}  
          />}
          
        />
      </View>
    );
}






export default ProyectsScreen;