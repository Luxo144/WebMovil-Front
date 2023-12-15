import React, { FC, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Alert } from 'react-native';
import Button from '../../components/button'; 
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';
import Toast from 'react-native-toast-message';
import useIdStore from '../../services/useIdStore';
import { deleteProject } from '../../services/project/project.service';
import { getToken } from '../../services/token.service';
import { Loader } from '../../components';
import ConfirmationModal from '../../components/confirmationModal';

type Props = StackScreenProps<ProyStackParamList,"ViewProyectScreen">;

const ViewProyectScreen: FC<Props> = ({navigation})=>{
    const [loading, setLoading] = useState(false);
    const idProject = useIdStore(state => state.projectId);
    const [modalVisible, setModalVisible] = useState(false);
    const handleEditTeam = () => {
        // Navegación a la pantalla de edición del proyecto
        navigation.navigate('EditProyScreen');
    };

    const handleViewMembers = () => {
        // Navegación a la pantalla para ver miembros del proyecto
        navigation.navigate('ProyMembersScreen');
    };

    const handleViewTasks = () => {
        // Navegación a la pantalla para ver miembros del proyecto
        navigation.navigate('TaskScreen');
    };
    const handleTeamInv = () =>{
        navigation.navigate('InvTeamScreen');
    }

    const handleDeleteProyect = () => {
        setModalVisible(true);
      };
    
      const handleDeleteConfirm = async () => {
        setModalVisible(false);
        setLoading(true);
        const token = await getToken();
        if (token && idProject) {
          const response = await deleteProject({ idProject: idProject }, token);
          setLoading(false);
          if ('error' in response) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: response.error.message || 'No se pudo eliminar el proyecto.'
            });
          } else {
            Toast.show({
              type: 'success',
              text1: 'Éxito',
              text2: 'Proyecto eliminado con éxito.'
            });
            navigation.goBack(); // O redirige a la pantalla de proyectos
          }
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error de Autenticación',
            text2: 'No se pudo obtener el token de usuario.'
          });
        }
      };


    return (
        <View style={styles.container}>
            <Button
                title="Editar Proyecto"
                onPress={() => handleEditTeam()}
            />

            <Button
                title="Ver Miembros del Proyecto"
                onPress={() => handleViewMembers()}
            />

            <Button
                title="Ver Tareas"
                onPress={handleViewTasks}
            />
            <Button
                title="Invitar equipo"
                onPress={handleTeamInv}
            />
            
            <Button title="Eliminar Proyecto" onPress={handleDeleteProyect} style={styles.deleteButton} />
      
            <ConfirmationModal
                visible={modalVisible}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setModalVisible(false)}
                type='proyecto'
            />



        </View>
    );
};



export default ViewProyectScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    deleteButton: {
        backgroundColor: 'red', 
    }
});