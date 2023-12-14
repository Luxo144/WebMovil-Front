import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProyInvitationData{
  id: number;
  status: string;
  invitationDate: string;
  nameProject: string;
  codeProject: string;
}

interface InvitationProps {
    inv: ProyInvitationData;
    onAccept: (invId: number) => void;
    onDecline: (invId: number) => void;
}

const ProyInvitation:React.FC<InvitationProps> = ({ inv,onAccept,onDecline }) => {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.teamName}>{inv.id}</Text>
          <Text>Te ha invitado a su proyecto</Text>
          <Text>Invitado el: {inv.invitationDate}</Text>
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
  
  export default ProyInvitation;