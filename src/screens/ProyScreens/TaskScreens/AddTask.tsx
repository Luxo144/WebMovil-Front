import React, { useState, FC, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../../ParamLists';
import { Picker } from '@react-native-picker/picker';
import { getAllMembersProject } from '../../../services/project/project.service';
import useIdStore from '../../../services/useIdStore';
import { getToken } from '../../../services/token.service';
import { UserProject } from '../../../types/project/project';
import { Loader } from '../../../components';
import { createTask } from '../../../services/task/task.service';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<ProyStackParamList,"AddTask">;

const AddStack: FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responsibleId, setResponsibleId] = useState<number|null>(null);
  const projectId = useIdStore(state => state.projectId);
  const [members, setMembers] = useState<UserProject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
    setLoading(true);  
      if(projectId){
        try {
          const token = await getToken();
          if (token) { 
            const response = await getAllMembersProject(projectId, token);
            if (Array.isArray(response)) {
              setMembers(response);
            } else {
              
              console.error(response);
            }            
          } else {
              console.error("Token is null.");
          }
        } catch (error) {
          console.error('Error al obtener los miembros:', error);
        }
      }
      setLoading(false); 
    };

    fetchMembers();
  }, [projectId]);

  const handleCreateTask = async () => {
    if(!name){
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ingrese un nombre a la tarea'
      });
      return;
    }
    if (!projectId) return;

    const TaskData = {
      name,
      description,
      responsibleId: responsibleId, // Convertir a número
      projectId: projectId // Convertir a número
    };

    try{
      setLoading(true);
      const token = await getToken();
      if (token) {
        const response = await createTask(TaskData, token);
        if("error" in response){
          throw new Error;
        }
        Toast.show({
          type: 'success',
          text1: 'Exito',
          text2: 'Tarea creada exitosamente'
        });
        navigation.goBack();        
      } else {
          console.error("Token is null.");
      }
    }catch(error){
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ocurrio un error al crear la tarea'
      });
    }finally{
      setLoading(false);
    }

    
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre de la Tarea:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        
      />
      <Text style={styles.label}>Encargado:</Text>
     <Picker
      selectedValue={responsibleId}
      onValueChange={(itemValue, itemIndex) => setResponsibleId(itemValue)}
      style={styles.picker}
      >
      <Picker.Item label="Seleccione un responsable" value={null} />
      {members.map((member) => (
        <Picker.Item key={member.id} label={member.firstName} value={member.id} />
      ))}
      </Picker>

      <Button title="Crear Tarea" onPress={handleCreateTask} />
      {loading && <Loader />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

});

export default AddStack;
