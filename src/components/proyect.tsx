import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProyectData{
  id: number;
  name: string;
  description: string;
  code: string;
  createdByUserId: number;
  createdAt: string;
  updatedAt: string;
}

interface ProyectProps{
    proyect: ProyectData;
    onView: (ProyId: number) => void;
  
}

const Proyect:React.FC<ProyectProps> = ({ proyect,onView }) => {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.teamName}>{proyect.name + " " + proyect.code}</Text>
          <Text>{proyect.description}</Text>
          <Text>Creado el: {proyect.createdAt}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onView(proyect.id)}>
            <Icon name="eye-settings-outline" size={25} color="black" />
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
  
  export default Proyect;
  