import React, { FC, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Button,Alert } from 'react-native';
import Team from '../components/team';


const HomeScreen:FC = (props) => {

  const [teams, setTeams] = useState([
    { id: '1', name: 'Equipo A', description: 'Descripción del Equipo A', date: '01-01-2023' },
    { id: '2', name: 'Equipo B', description: 'Descripción del Equipo B', date: '05-01-2023' },
  ]);

  const handleEdit = (teamId) => {
    
    props.navigation.navigate('EditTeam', { teamId });
  };

  const deleteTeam = (teamId) => {}

  const handleDelete = (teamId) => {
    Alert.alert(
      "Eliminar Equipo",
      "¿Estás seguro de que quieres eliminar este equipo?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Eliminar", onPress: () => deleteTeam(teamId) }
      ]
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Team team={item}
        onEdit={handleEdit}
        onDelete={handleDelete} />}
        
      />
      <Button title="Añadir equipo" onPress={() => props.navigation.navigate('AddTeam')} />
    </View>
  );
};

export default HomeScreen;
