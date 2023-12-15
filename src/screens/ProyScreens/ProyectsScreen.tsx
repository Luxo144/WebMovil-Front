import React,{ FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import Proyect from '../../components/proyect';
import { Loader } from '../../components';
import { Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';

import { getToken } from '../../services/token.service';
import { getAllProjects } from '../../services/project/project.service';
import Toast from 'react-native-toast-message';
import { Project } from '../../types/project/project';
import { useFocusEffect } from '@react-navigation/native';
import useIdStore from '../../services/useIdStore';
type Props = StackScreenProps<ProyStackParamList,"ProyectsScreen">;

const ProyectsScreen: FC<Props> = ({navigation}) => {

    const [proyects, setProyects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const setProyectId = useIdStore(state => state.setProjectId);
    const handleView = (proyId:number) => {
      setProyectId(proyId);
      navigation.navigate("ViewProyectScreen");  
    }
    
    useFocusEffect(
      React.useCallback(() => {
        const fetchProjects = async () => {
          setLoading(true);
          const token = await getToken();
          if (token) {
            const projectsResponse = await getAllProjects(token);
            console.log("response",projectsResponse);
            if ('error' in projectsResponse) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: projectsResponse.error.message,
              });
            } else {
              setProyects(projectsResponse);
            }
          }
          setLoading(false);
        };
  
        fetchProjects();
        return () => setProyects([]);
      }, [])
    );


    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {loading ? (
          <Loader />
        ) : proyects.length > 0 ? (
          <FlatList
            data={proyects}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Proyect
                proyect={item}
                onView={() => handleView(item.id)}
              />
            )}
          />
        ) : (
          <Text style={styles.noProyectsText}>No hay proyectos disponibles.</Text>
        )}
        <View style={styles.addButtonContainer}>
          <Button title="Crear proyecto" onPress={() => navigation.navigate('AddProyScreen')} />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    noProyectsText: {
      textAlign: 'center',
      margin: 20,
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






export default ProyectsScreen;