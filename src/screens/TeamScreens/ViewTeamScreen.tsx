import React,{ FC, useId, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Button from '../../components/button'; // Asegúrate de que esta ruta sea correcta
import { StackScreenProps } from '@react-navigation/stack';
import {TeamStackParamList} from '../../../ParamLists'
import Toast from 'react-native-toast-message';
import { getToken } from '../../services/token.service';
import { deleteTeam } from '../../services/team/team.service';
import useIdStore from '../../services/useIdStore';
type Props = StackScreenProps<TeamStackParamList,"ViewTeamScreen">


const ViewTeamScreen:FC<Props> = ({route, navigation}) => {
    const [loading, setLoading] = useState(false);
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
        const teamId = useIdStore.getState().teamId;
        console.log(teamId);
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
                    onPress: async () => {
                        setLoading(true);
                        const token = await getToken(); // Asegúrate de obtener el token
                        if (token && teamId) {
                            const response = await deleteTeam(teamId, token);
                            console.log(response);
                            if ('error' in response) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Error',
                                    text2: response.error.message
                                });
                            } else {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Éxito',
                                    text2: response.message
                                });
                                navigation.navigate('TeamScreen');
                            }
                        }
                        setLoading(false);
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
