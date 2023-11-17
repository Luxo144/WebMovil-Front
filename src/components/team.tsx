import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TeamData {
  id: string;
  name: string;
  description: string;
  date: string;
  ownerId: string;
}

interface TeamProps {
  team: TeamData;
  onView: () => void;
}

const Team:React.FC<TeamProps> = ({ team,onView }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text>{team.description}</Text>
        <Text>Creado el: {team.date}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onView()}>
          <Icon name="eye-settings-outline" size={25} color="blue" />
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
