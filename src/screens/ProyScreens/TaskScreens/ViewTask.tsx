import React,{FC, useState} from 'react';
import { View, Text, StyleSheet, ScrollView ,TextInput} from 'react-native';
import { ProyStackParamList } from '../../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from '../../../components';
import RNPickerSelect from 'react-native-picker-select';

type Props = StackScreenProps<ProyStackParamList,"ViewTask">;

const ViewTask:FC<Props> = ({ navigation }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [responsible, setResponsible] = useState("");
    const [status, setStatus] = useState("Por Hacer");
  
    // Tus hooks no editables...
    const [createdBy] = useState("Nombre del creador");
    const [startDate] = useState("2023-01-01");
    const [endDate] = useState("2023-12-31");
    const [createdAt] = useState("2023-01-01");
    const [updatedAt] = useState("2023-01-02");
  
    
      const statusOptions = [
        { label: 'Por Hacer', value: 'Por Hacer' },
        { label: 'En Curso', value: 'En Curso' },
        { label: 'Realizada', value: 'Realizada' },
        // ...otros estados...
      ];
      const responsibleOptions = [
        { label: 'Usuario 1', value: 'usuario1' },
        { label: 'Usuario 2', value: 'usuario2' },
        // ...otros valores...
      ];

    const handleSave = () =>{
      navigation.goBack();
    }
    const viewComments = () =>{
      //navigation.navigate("ViewComments");
    }

  return (
    <ScrollView style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Nombre de la tarea"
        />
        <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder="Descripcion"
        />
        <Button title='Ver comentarios' onPress={viewComments}></Button>
        <RNPickerSelect
            onValueChange={(value) => setResponsible(value)}
            items={responsibleOptions}
            placeholder={{ label: "Selecciona un encargado", value: null }}
        />
        <RNPickerSelect
            onValueChange={(value) => setStatus(value)}
            items={statusOptions}
            value={status}
            
         /> 
        
 
        <View style={styles.nonEditableContainer}>
            <Text style={styles.nonEditableLabel}>Creado por:</Text>
            <Text style={styles.nonEditableText}>{createdBy}</Text>
            <Text style={styles.nonEditableLabel}>Fecha de inicio: </Text>
            <Text style={styles.nonEditableText}>{startDate}</Text>
            <Text style={styles.nonEditableLabel}>Fecha de termino: </Text>
            <Text style={styles.nonEditableText}>{endDate}</Text>
            <Text style={styles.nonEditableLabel}>Fecha de creación: </Text>
            <Text style={styles.nonEditableText}>{createdAt}</Text>
            <Text style={styles.nonEditableLabel}>Última actualización:</Text>
            <Text style={styles.nonEditableText}> {updatedAt}</Text>
        </View>
        <Button title='Guardar' onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    nonEditableContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
      },
      nonEditableLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      nonEditableText: {
        fontSize: 16,
      },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
      },
    // ...otros estilos...
  });

export default ViewTask;
