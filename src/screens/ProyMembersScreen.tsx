import React, { FC, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Alert } from 'react-native';
import { Button } from '../components';
import ProyMember from '../components/proyMember';

const ProyMembersScreen:FC = (props) =>{

const [proyMembers, setProyMembers] = useState([
    { id: '1', teamName: 'T1', admin: 'Faker'},
    { id: '2', teamName: 'DRX', admin: 'Beryl'},
  ]);

const handleDelete = (teamId) => {
    setProyMembers(proyMembers.filter(member => member.id !== teamId));
}


return(
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <FlatList
      data={proyMembers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProyMember team={item}

      onDelete={handleDelete}
      />}     
    />
    <Button title="Añadir equipo" onPress={() => props.navigation.navigate('AddProy')} />
  </View>
);
}

export default ProyMembersScreen;