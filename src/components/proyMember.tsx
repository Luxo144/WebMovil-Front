import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




interface proyMember{
  id: number;
  name: string;
  description: string;
  code: string;
  createdByUserId: number;
  createdAt: string;
  updatedAt: string;
  deleteAt: string;
}


interface teamProps{
    team: proyMember;

    onDelete: (id:number) => void;
}



const ProyMember:React.FC<teamProps> = ({ team,onDelete }) =>{
    return (
        <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.teamName}>{team.name + " " + team.code}</Text>
          <Text>{team.createdAt}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onDelete(team.id)}>
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
    teamName: {
      fontSize: 18,  
      fontWeight: 'bold',
    },
  });

  export default ProyMember;