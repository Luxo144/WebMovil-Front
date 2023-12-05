import React,{ FC, useState } from 'react';
import { View, StyleSheet, Alert, Text,FlatList } from 'react-native';
import { Button } from '../../components';
import TeamMember from '../../components/teamMember';
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'

type Props = StackScreenProps<TeamStackParamList,"TeamMembersScreen">


const TeamMembersScreen:FC<Props> = ({navigation}) =>{

    const [teamMembers, setTeamMembers] = useState([
        { id: '1', name: 'Carlos', role: 'Miembro'},
        { id: '2', name: 'Juan', role: 'Desarrollador'},
      ]);

    const handleEdit = (memberId: string) => {
      
    }
    const handleDelete = (memberId: string) => {
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
        <Button title="Añadir integrante" onPress={() => navigation.navigate('AddMemberScreen')} />
      </View>
    );
}


export default TeamMembersScreen;