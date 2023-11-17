import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




interface teamMember{
    id: string;
    name: string;
    role: string;
}

interface memberProps{
    member: teamMember;
    onEdit: (memberId:string) => void;
    onDelete: (memberId:string) => void;
}

const TeamMember:React.FC<memberProps> = ({ member,onEdit,onDelete }) =>{
    return (
        <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text>{member.role}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onEdit(member.id)}>
            <Icon name="pencil" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(member.id)}>
            <Icon name="delete" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      );

}

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
    memberName: {
      fontSize: 18,  
      fontWeight: 'bold',
    },
  });

  export default TeamMember;