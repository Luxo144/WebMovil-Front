import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TeamInvitationData{
    id: number;
    invitedUserId: number;
    status: string;
    invitationDate: string;
    team: TeamData;
}
interface TeamData {
  code: string;
  createdAt: string;
  createdByUserId: number;
  deletedAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string;
}

interface InvitationProps {
    inv: TeamInvitationData;
    onAccept: (invId: number) => void;
    onDecline: (invId: number) => void;
}

const TeamInvitation: React.FC<InvitationProps> = ({ inv, onAccept, onDecline }) => {
  return (
      <View style={styles.container}>
          <View style={styles.infoContainer}>
              <Text style={styles.teamName}>{inv.team.name +" "+ inv.team.code}</Text> 
              <Text>Te ha invitado a su equipo</Text>
              <Text>Invitado el: {inv.invitationDate.split('T')[0]}</Text> 
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => onAccept(inv.id)}>
                  <Icon name="check-bold" size={25} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDecline(inv.id)}>
                  <Icon name="delete" size={25} color="red" />
              </TouchableOpacity>
          </View>
      </View>
  );
};


  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    infoContainer: {
      flex: 3,
      marginLeft:15,
      marginBottom:10
    },
    buttonContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
    },
    teamName: {
      fontSize: 18,  
      fontWeight: 'bold',
    },
  });
  
  export default TeamInvitation;
  
