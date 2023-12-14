import React, { FC, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Alert } from 'react-native';
import Button from '../../components/button'; // Asegúrate de que esta ruta sea correcta

import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';

type Props = StackScreenProps<ProyStackParamList,"ViewProyectScreen">;

const ViewProyectScreen: FC<Props> = ({navigation})=>{

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

    const handleDeleteProyect = () => {
        // Confirmación para eliminar el equipo
        Alert.alert(
            "Eliminar Proyecto",
            "¿Estás seguro de que quieres eliminar el proyecto?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        // Aquí se maneja la lógica de eliminación del proyecto
                    }
                }
            ]
        );
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
                title="Eliminar Proyecto"
                onPress={handleDeleteProyect}
                style={styles.deleteButton}
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