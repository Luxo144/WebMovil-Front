import React,{ FC, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Button from '../../components/button'; // Asegúrate de que esta ruta sea correcta
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'

type Props = StackScreenProps<TeamStackParamList,"ViewTeamScreen">


const ViewTeamScreen:FC<Props> = ({navigation}) => {

    const handleEditTeam = () => {
        // Navegación a la pantalla de edición del equipo
        navigation.navigate('EditTeamScreen');
    };

    const handleViewMembers = () => {
        // Navegación a la pantalla para ver miembros del equipo
        navigation.navigate('TeamMembersScreen');
    };

    const handleViewInvitations = () =>{
        navigation.navigate('ProyInvitationScreen');
    }

    const handleDeleteTeam = () => {
        // Confirmación para eliminar el equipo
        Alert.alert(
            "Eliminar Equipo",
            "¿Estás seguro de que quieres eliminar el equipo?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        // Aquí se maneja la lógica de eliminación del equipo
                    }
                }
            ]
        );
    };


    return (
        <View style={styles.container}>
            <Button
                title="Editar Equipo"
                onPress={() => handleEditTeam()}
            />
            <Button
                title="Ver invitaciones de proyecto"
                onPress={() => handleViewInvitations()}
            />

            <Button
                title="Ver Miembros del Equipo"
                onPress={() => handleViewMembers()}
            />

            <Button
                title="Eliminar Equipo"
                onPress={handleDeleteTeam}
                style={styles.deleteButton}
            />
        </View>
    );
};



export default ViewTeamScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    deleteButton: {
        backgroundColor: 'red', // Esto sobrescribirá el color de fondo del botón para este caso
    }
});
