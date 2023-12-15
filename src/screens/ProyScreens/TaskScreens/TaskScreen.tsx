import React, { useState, FC } from 'react';
import { View, FlatList, Switch,StyleSheet ,Text} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Task from '../../../components/task'; 
import { Loader,Button } from '../../../components';
import { ProyStackParamList } from '../../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';
import ConfirmationModal from '../../../components/confirmationModal';
import useIdStore from '../../../services/useIdStore';
import { deleteTask, getAllTasks } from '../../../services/task/task.service';
import { getToken } from '../../../services/token.service';
import { GetTask} from '../../../types/task/task'
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<ProyStackParamList,"TaskScreen">;


const TasksScreen:FC<Props> = ({navigation}) => {
  const [tasks, setTasks] = useState<GetTask[]>();
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const setTaskId = useIdStore(state =>state.setTaskId);
  const projectId = useIdStore(state => state.projectId);
  const [loading,setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      setTasks([]);
      if (token && projectId) {
        const response = await getAllTasks(projectId, token);
        console.log("task",response);
        if ("error" in response) {
          throw new Error;
        }
        setTasks(response);
      }
    } catch (error) {
      // Manejo de errores
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
      return () => setTasks([]);
    }, [])
  );

  const handleAdd = () =>{
    
    console.log("selectedTaskId",selectedTaskId);
    navigation.navigate("AddTask");
    
  }
  const handleViewTask = () => {
    navigation.navigate("ViewTask");
  };

  
  const handleDeletePress = (taskId:number) => {
    setSelectedTaskId(taskId);
    setModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    setModalVisible(false);
    setLoading(true);
    
    const token = await getToken(); 
    if (!token) {
        Toast.show({
            type: 'error',
            text1: 'Error de Autenticación',
            text2: 'No se pudo obtener el token de usuario.'
        });
        setLoading(false);
        return;
    }
    console.log("selectedTaskId",selectedTaskId);

    if (!selectedTaskId) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No se pudo eliminar la tarea.'
        });
        setLoading(false);
        return;
    }

    const taskData = { idTask: selectedTaskId }; // Asegúrate de que esta estructura coincida con lo que espera tu API
    const response = await deleteTask(taskData, token);
    console.log(response);
    if ('error' in response) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: response.error.message || 'No se pudo eliminar la tarea.'
        });
    } else {
        Toast.show({
            type: 'success',
            text1: 'Éxito',
            text2: 'Tarea eliminada con éxito.'
        });
        await loadTasks();
    }
    setLoading(false);
};


return (
  <View style={{ flex: 1 }}>
    <View style={styles.switchContainer}>
      <Text>{isSwitchEnabled ? 'Mis Tareas' : 'Todas las tareas'}</Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isSwitchEnabled}
      />
    </View>

    {tasks && tasks.length > 0 ? (
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Task
            task={item}
            onView={handleViewTask}
            onDelete={handleDeletePress}
          />
        )}
      />
    ) : (
      <Text style={styles.noTasksText}>No hay tareas en el equipo.</Text>
    )}

    <Button title='Agregar tarea' onPress={handleAdd}/>
    <ConfirmationModal
      visible={modalVisible}
      onConfirm={handleDeleteConfirm}
      onCancel={() => setModalVisible(false)}
      type='tarea'
    />
  </View>
);
    };
// Agrega el siguiente estilo en tu objeto de estilos
const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

});

export default TasksScreen;
