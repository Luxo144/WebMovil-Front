import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Team = ({ team }) => {
  return (
    <View style={styles.teamContainer}>
      <Text style={styles.teamName}>{team.name}</Text>
      <Text style={styles.teamDescription}>{team.description}</Text>
      <Text style={styles.teamDate}>Creado el: {team.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  teamContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  teamDescription: {
    marginTop: 8,
    fontSize: 16,
  },
  teamDate: {
    marginTop: 8,
    fontSize: 12,
    color: 'grey',
  },
});

export default Team;
