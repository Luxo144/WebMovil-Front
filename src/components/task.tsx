import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


interface TaskData{
    id: number;
    name: string;
    nameCreatedBy: string;
    status: string;
    createdAt: string;
}

interface TaskProps {
    task: TaskData;
    onView: () => void;
    onDelete: (invId: number) => void;
}


const Task:React.FC<TaskProps> = ({ task, onView, onDelete }) => {
  const backgroundColor = getBackgroundColor(task.status);

  return (
    <View style={[styles.taskContainer, { backgroundColor }]}>
      <Text style={styles.taskName}>{task.name}</Text>
      <Text>Creado por: {task.nameCreatedBy}</Text>
      <Text>Fecha de Creación: {task.createdAt}</Text>
      <Text>Estado: {task.status}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => onView()}>
          <Icon name="visibility" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} >
          <Icon name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getBackgroundColor = (status:string) => {
  switch (status) {
    case 'En curso':
      return '#f0ad4e'; // Amarillo
    case 'Por hacer':
      return '#5bc0de'; // Azul
    case 'Realizada':
      return '#5cb85c'; // Verde
    default:
      return '#f0f0f0'; // Gris por defecto
  }
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  taskName: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
  },

});

export default Task;
