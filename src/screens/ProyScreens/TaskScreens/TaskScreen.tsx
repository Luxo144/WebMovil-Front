import React, { useState, FC } from 'react';
import { View, FlatList, Switch,StyleSheet ,Text} from 'react-native';
import Task from '../../../components/task'; 
import { ProyStackParamList } from '../../../../ParamLists';
import { StackScreenProps } from '@react-navigation/stack';


type Props = StackScreenProps<ProyStackParamList,"TaskScreen">;
const tasksData = [
    {
      id: 1,
      name: 'Diseñar Interfaz de Usuario',
      createdBy: 'Ana García',
      creationDate: '2022-09-01',
      status: 'Por hacer'
    },
    {
      id: 2,
      name: 'Implementar Autenticación',
      createdBy: 'Luis Pérez',
      creationDate: '2022-09-05',
      status: 'En curso'
    },
    {
      id: 3,
      name: 'Revisar Documentación del Proyecto',
      createdBy: 'Marta Sánchez',
      creationDate: '2022-09-10',
      status: 'Realizada'
    },
    {
      id: 4,
      name: 'Desarrollar Componente de Notificaciones',
      createdBy: 'Carlos López',
      creationDate: '2022-09-15',
      status: 'Por hacer'
    },
    {
      id: 5,
      name: 'Testear la Aplicación Móvil',
      createdBy: 'Sofía Martín',
      creationDate: '2022-09-20',
      status: 'En curso'
    }
  ];
  

const TasksScreen:FC<Props> = ({navigation}) => {
  const [tasks, setTasks] = useState(tasksData);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);

  const handleViewTask = () => {

  };

  const handleDeleteTask = (taskId:number) => {
    // Eliminar la tarea de la lista (y opcionalmente del backend)

  };

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.switchContainer}>
        <Text>{isSwitchEnabled ? 'Modo Especial Activado' : 'Modo Especial Desactivado'}</Text>
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
            onDelete={handleDeleteTask}
          />
        )}
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
