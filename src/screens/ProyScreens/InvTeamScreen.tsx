import React, { useState, FC } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ProyStackParamList } from '../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<ProyStackParamList,"InvTeamScreen">

const InvTeamScreen: FC<Props> = ({navigation}) => {
    const [teamCode, setTeamCode] = useState('');
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingrese el código del equipo:</Text>
        <TextInput
          style={styles.input}
          value={teamCode}
          onChangeText={setTeamCode}
          placeholder="Código del equipo"
          keyboardType="default" // O "numeric" si el código es numérico
        />
        {/* Puedes añadir más componentes aquí si es necesario */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      width: '80%',
      marginBottom: 20,
    },
    // ...otros estilos que necesites...
  });
  
  export default InvTeamScreen;
  