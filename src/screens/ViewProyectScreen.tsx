import React, { FC, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Alert } from 'react-native';
import Button from '../components/button'; // Asegúrate de que esta ruta sea correcta

const ViewProyectScreen: FC = (props)=>{

    const handleEditTeam = () => {
        // Navegación a la pantalla de edición del proyecto
        props.navigation.navigate('EditProy');
    };

    const handleViewMembers = () => {
        // Navegación a la pantalla para ver miembros del proyecto
        props.navigation.navigate('ProyMembers');
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