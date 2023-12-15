import React,{FC, useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView ,TextInput} from 'react-native';
import { ProyStackParamList } from '../../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Loader } from '../../../components';
import { UserProject } from '../../../types/project/project';
import { Picker } from '@react-native-picker/picker';
import useIdStore from '../../../services/useIdStore';
import { getAllMembersProject } from '../../../services/project/project.service';
import { getTaskById,updateTask } from '../../../services/task/task.service';
import { getToken } from '../../../services/token.service';
import Toast from 'react-native-toast-message';


type Props = StackScreenProps<ProyStackParamList,"ViewTask">;

const ViewTask:FC<Props> = ({ navigation }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [responsibleId, setResponsibleId] = useState<number|null>(null);
    const [status, setStatus] = useState("Por Hacer");

    const [members, setMembers] = useState<UserProject[]>([]);
    const [createdBy,setCreatedBy] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [createdAt,setCreatedAt] = useState("");
    const [updatedAt,setUpdatedAt] = useState("");
    

    const projectId = useIdStore(state => state.projectId)
    const taskId = useIdStore(state => state.taskId);
    const [loading,setLoading] = useState(false);

    const handleSave = async () =>{
      if(!name || !description){
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Llene con nombre y descripcion'
        });
        return;
      }
      
      const TaskData = {
  name: name || "",
  description: description || "",
  responsibleId: responsibleId ?? undefined, 
  status,
  comments: "",
  endDate: endDate || ""
};

      try{
        setLoading(true);
        const token = await getToken();
        console.log("token",token);
        console.log("taskId",taskId);
        console.log("responsibleId",responsibleId);
        if (token&&taskId){
          const response = await updateTask(TaskData,token,taskId);
          console.log("response",response);
          if ("error" in  response){
            throw new Error;
          }else{
            Toast.show({
              type: 'success',
              text1: 'Exito',
              text2: 'Tarea actualizada con ezito'
            });
            navigation.goBack();
          }
        }
        
      }catch(error){
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error al actualizar la tarea'
        });
      }finally{
        setLoading(false);
      }

      
    }
    const viewComments = () =>{
      //navigation.navigate("ViewComments");
    }

    useEffect(() => {
      const fetchMembers = async () => {
        setLoading(true); 
        console.log("projectId",projectId); 
        console.log("taskId",taskId);
        if(projectId && taskId){
          try {
            const token = await getToken();
            if (token) { 
              const response = await getAllMembersProject(projectId, token);
              console.log("response",response);
              const response2 = await getTaskById(taskId, token);
              console.log("response",response2);
              if (Array.isArray(response)) {
                setMembers(response);
              }
              if ("error" in response2) {
                throw new Error;
              } else {
                console.log("response2",response2);
                setName(response2.name);
                setDescription(response2.description);
                setResponsibleId(response2.responsibleId);
                setStatus(response2.status);
                setCreatedBy(response2.nameCreatedBy);
                setStartDate(response2.startDate);
                setEndDate(response2.endDate);
                setCreatedAt(response2.createdAt.split('T')[0]);
                setUpdatedAt(response2.updatedAt.split('T')[0]);
              }         
            } else {
              console.error("Token is null.");
            }
          } catch (error) {
            console.error('Error al cargar la pagina', error);
          }
        }
        setLoading(false); 
      };
    
      fetchMembers();
    }, [projectId]);
    

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

        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Por Hacer" value="Por Hacer" />
          <Picker.Item label="En curso" value="En curso" />
          <Picker.Item label="Realizada" value="Realizada" />
        </Picker>

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
        {loading && <Loader />}
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
  });

export default ViewTask;
