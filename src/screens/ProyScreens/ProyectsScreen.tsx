import React,{ FC, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import Proyect from '../../components/proyect';
import { Button } from '../../components';

import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';

type Props = StackScreenProps<ProyStackParamList,"ProyectsScreen">;

const ProyectsScreen: FC<Props> = ({navigation}) => {

    const [proyects, setProyects] = useState([
        { id: '1', name: 'Proyecto A', description: 'Descripción del Proyecto A', date: '01-01-2023', ownerId:'1' },
        { id: '2', name: 'Proyecto B', description: 'Descripción del Proyecto B', date: '05-01-2023', ownerId:'5' },
      ]);

    const handleView = (proyId:string) => {
      navigation.navigate("ViewProyectScreen");  
    }
 

    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={proyects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Proyect proyect={item}
          onView={handleView}
          />}     
        />
        <Button title="Añadir equipo" onPress={() => navigation.navigate('AddProyScreen')} />
      </View>
    );
}






export default ProyectsScreen;