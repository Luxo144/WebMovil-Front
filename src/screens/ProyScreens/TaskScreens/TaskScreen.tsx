import React, { useState, FC, useEffect, useRef } from 'react';
import { View, FlatList, Switch,StyleSheet ,Text, TextInput} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Task from '../../../components/task'; 
import { Loader,Button } from '../../../components';
import { ProyStackParamList } from '../../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';
import ConfirmationModal from '../../../components/confirmationModal';
import useIdStore from '../../../services/useIdStore';
import { deleteTask, getAllTasks, getTasks } from '../../../services/task/task.service';
import { getToken } from '../../../services/token.service';
import { GetTask} from '../../../types/task/task'
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { Keyboard } from 'react-native';

type Props = StackScreenProps<ProyStackParamList,"TaskScreen">;


const TasksScreen:FC<Props> = ({navigation}) => {
  const [tasks, setTasks] = useState<GetTask[]>();
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const setTaskId = useIdStore(state =>state.setTaskId);
  const projectId = useIdStore(state => state.projectId);
  const [loading,setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterMyTasks, setFilterMyTasks] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toggleSwitch = () => {
    setIsSwitchEnabled(previousState => !previousState);
  };
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);  const [searchTimeout, setSearchTimeout] = useState(null);
  useEffect(() => {
    fetchFilteredTasks();
  }, [selectedStatus, search, isSwitchEnabled, projectId]);

  
  const loadTasks = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      setTasks([]);
      if (token && projectId) {
        const response = await getAllTasks(projectId, token);
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
    
    navigation.navigate("AddTask");
    
  }
  const handleViewTask = (taskId:number) => {
    setTaskId(taskId);
    navigation.navigate("ViewTask");
  };

  const handleStatusChange = (itemValue: string | null) => {
    setSelectedStatus(itemValue);
  };
  
  const handleDeletePress = (taskId:number) => {
    setSelectedTaskId(taskId);
    setModalVisible(true);
  };

  const fetchFilteredTasks = async () => {
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
    console.log("selected",selectedStatus);

    const queryParams = {
      projectId: projectId,
      name: search, 
      myTasks: isSwitchEnabled,
      status: selectedStatus,
    };

    console.log(queryParams);
    const tasksResponse = await getTasks(queryParams, token);
    if (!('error' in tasksResponse)) {
      setTasks(tasksResponse);
    } else {
      // Manejo de error
    }
    setLoading(false);
  }

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

const handleSearchChange = (text: string) => {
  setSearch(text);
  if (text === '' && text!==search) {
    fetchFilteredTasks();
  }
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }
  searchTimeoutRef.current = setTimeout(() => {
    fetchFilteredTasks();
  }, 500);
};

const handleClearSearch = () => {
  setSearch(''); 
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }
  fetchFilteredTasks(); 
};


return (
  <View style={{ flex: 1 }}>
    <TextInput
        style={styles.searchInput}
        placeholder="Buscar tarea"
        value={search}
        onChangeText={handleSearchChange}
      />  
      
     <Picker
        selectedValue={selectedStatus}
        onValueChange={handleStatusChange}
        style={styles.picker}
      >
        <Picker.Item label="Todos los estados" value = {null} />
        <Picker.Item label="Por Hacer" value="Por Hacer" />
        <Picker.Item label="En curso" value="En curso" />
        <Picker.Item label="Realizada" value="Realizada" />
      </Picker>


    <View style={styles.switchContainer}>
        <Text>Filtrar mis tareas</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isSwitchEnabled}
        />
      </View>

    {loading ? <Loader /> : (
      tasks && tasks.length > 0 ? (
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
      <Text style={styles.noTasksText}>No hay tareas en el proyecto.</Text>
    )
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
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 10,
  },
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
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
export default TasksScreen;
