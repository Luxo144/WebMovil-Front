import React,{ FC, useState } from 'react';
import { View, StyleSheet, Alert, Text,FlatList } from 'react-native';
import { Button } from '../components';
import TeamMember from '../components/teamMember';

const TeamMembersScreen:FC = (props) =>{

    const [teamMembers, setTeamMembers] = useState([
        { id: '1', name: 'Carlos', role: 'Miembro'},
        { id: '2', name: 'Juan', role: 'Desarrollador'},
      ]);

    const handleEdit = (memberId) => {
      
    }
    const handleDelete = (memberId) => {
        setTeamMembers(teamMembers.filter(member => member.id !== memberId));
    }
 

    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={teamMembers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TeamMember member={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
          />}     
        />
        <Button title="Añadir integrante" onPress={() => props.navigation.navigate('AddProy')} />
      </View>
    );
}


export default TeamMembersScreen;