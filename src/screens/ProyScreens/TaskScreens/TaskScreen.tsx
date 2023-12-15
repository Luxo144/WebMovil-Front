import React, { useState, FC } from 'react';
import { View, FlatList, Switch,StyleSheet ,Text} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Task from '../../../components/task'; 
import { Loader,Button } from '../../../components';
import { ProyStackParamList } from '../../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';
import ConfirmationModal from '../../../components/confirmationModal';
import useIdStore from '../../../services/useIdStore';
import { getAllTasks } from '../../../services/task/task.service';
import { getToken } from '../../../services/token.service';
import { GetTask} from '../../../types/task/task'

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

  useFocusEffect(
    React.useCallback(() => {
      const loadTasks = async () => {
        try {
          setLoading(true);
          const token = await getToken();
          console.log("token", token);
          console.log("projectId", projectId);
          if(token && projectId){
            const response = await getAllTasks(projectId,token);
            console.log(response);
            if("error" in response){
              throw new Error;
            }
            setTasks(response);
          }
        } catch (error) {
          
        }finally{
          setLoading(false);
        }
      };

      loadTasks();
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

    setModalVisible(true);
    
  };

  const handleDeleteConfirm = () => {
    setModalVisible(false);
  };

  const handleDeleteTask = (taskId:number) => {
    // Eliminar la tarea de la lista (y opcionalmente del backend)

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

const styles = StyleSheet.create({
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0'
    },
    // ...otros estilos...
  });


export default TasksScreen;
