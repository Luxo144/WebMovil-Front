import React, { FC, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Button } from 'react-native';
import Team from '../components/team';

const HomeScreen:FC = (props) => {

  const [teams, setTeams] = useState([
    { id: '1', name: 'Equipo A', description: 'Descripción del Equipo A', date: '01-01-2023' },
    { id: '2', name: 'Equipo B', description: 'Descripción del Equipo B', date: '05-01-2023' },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Team team={item} />}
      />
      <Button title="Añadir equipo" onPress={() => props.navigation.navigate('AddTeam')} />
    </View>
  );
};

export default HomeScreen;