import React from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TeamData {
  id: string;
  name: string;
  description: string;
  date: string;
}

interface TeamProps {
  team: TeamData;
  onEdit: (teamId: string) => void;
  onDelete: (teamId: string) => void;
}

const Team:React.FC<TeamProps> = ({ team,onEdit,onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text>{team.description}</Text>
        <Text>Creado el: {team.date}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onEdit(team.id)}>
          <Icon name="pencil" size={25} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(team.id)}>
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

export default Team;
