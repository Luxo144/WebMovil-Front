import React, { FC, useId, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Team from '../../components/team';
import { StackScreenProps } from '@react-navigation/stack';
import { TeamStackParamList } from '../../../ParamLists';
import { Loader } from '../../components';
import { getAllTeamsOfUser } from '../../services/team/teamMember.service';
import { getToken } from '../../services/token.service';
import { Teams } from '../../types/team/teams';
import useIdStore from '../../services/useIdStore';
type Props = StackScreenProps<TeamStackParamList, "TeamScreen">

const TeamScreen: FC<Props> = ({ navigation }) => {
  const [teams, setTeams] = useState<Teams[]>([]);
  const [loading, setLoading] = useState(true);
  const setTeamId = useIdStore(state => state.setTeamId);
  const setCodeTeam = useIdStore(state => state.setCodeTeam);
  const handleView = (teamId: number, codeTeam: string) => {
    setTeamId(teamId);  
    setCodeTeam(codeTeam);
    navigation.navigate('ViewTeamScreen');
  };

  useFocusEffect(
    
    React.useCallback(() => {
      let isActive = true;
      console.log('useFocusEffect')
      const loadTeams = async () => {
        if (!isActive) return;
        setLoading(true);
        try {
          const token = await getToken();
          setTeams([]);
          if (token) {
            const response = await getAllTeamsOfUser(token);
            console.log(response);
            if (!Array.isArray(response)) {
              console.log(response);
              return;
            }
            setTeams(response);
          }
        } catch (error) {
          console.log(error);
        } finally {
          if (isActive) setLoading(false);
        }
      };
  
      loadTeams();
      return () => {
        isActive = false;
      };
    }, [])
  );
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {loading ? (
        <Loader /> 
      ) : teams.length > 0 ? (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Team 
              team={item}
              onView={() => handleView(item.id, item.code)}
            />
          )}
        />
      ) : (
        <View style={styles.noTeamsContainer}>
          <Text>No tienes equipos asignados.</Text>
        </View>
      )}
      <View style={styles.addButtonContainer}>
      <Button title="Crear equipo" onPress={() => navigation.navigate('AddTeamScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noTeamsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {
    position: 'absolute', 
    bottom: 0,
    left: 0, 
    right: 0, 
    backgroundColor: 'transparent', 
    padding: 10, 
  },

  

});

export default TeamScreen;
