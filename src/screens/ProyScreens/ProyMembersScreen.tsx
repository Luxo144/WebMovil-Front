import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Button, Loader } from '../../components'; // Asume que tienes un componente de carga
import ProyMember from '../../components/proyMember';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../ParamLists';
import Toast from 'react-native-toast-message';
import useIdStore from '../../services/useIdStore';
import { getToken } from '../../services/token.service';
import { UserProject } from '../../types/project/project';
import { getTeamsOfProject } from '../../services/project/projectTeam.service';
import { TeamsOfProject } from '../../types/project/projectTeam';

type Props = StackScreenProps<ProyStackParamList, "ProyMembersScreen">;

const ProyMembersScreen: FC<Props> = ({ navigation }) => {
    const [proyMembers, setProyMembers] = useState<TeamsOfProject[]>([]);
    const [loading, setLoading] = useState(false);
    const projectId = useIdStore(state => state.projectId); 

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            const token = await getToken();
            if (token && projectId) {
              console.log(projectId);
                const response = await getTeamsOfProject(projectId, token);
                console.log(response);
                setLoading(false);
                if ('error' in response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: response.error.message,
                    });
                } else {
                    setProyMembers(response);
                }
            }
        };

        fetchMembers();
    }, [projectId]);

    const handleDelete = async (userId: number) => {
        // Implementar lógica de eliminación aquí
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <FlatList
                        data={proyMembers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ProyMember
                                team={item}
                                onDelete={() => handleDelete(item.id)}
                            />
                        )}
                    />
                </>
            )}
        </View>
    );
};



export default ProyMembersScreen;