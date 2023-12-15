import React, { useState, useEffect, FC } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProyStackParamList } from '../../../../ParamLists';
import { getComments,addComment } from '../../../services/task/task.service';
import { getToken } from '../../../services/token.service';
import useIdStore from '../../../services/useIdStore';
import Toast from 'react-native-toast-message';
import { Loader } from '../../../components';

type Props = StackScreenProps<ProyStackParamList,"ViewComments">;

// Supongamos que esta es la estructura de tus comentarios
interface Comments {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  nameCreatedBy: string;
}

const ViewComments: FC<Props> = ({navigation}) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [newComment, setNewComment] = useState('');
  const taskId = useIdStore(state => state.taskId);
  const [refreshComments, setRefreshComments] = useState(false);
  const [loading,setLoading] = useState(false);  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = await getToken();
        if (token&&taskId){
            const response = await getComments(taskId,token); 
            console.log(response);
            if('error' in response){
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.error.message
                  });
            }else{
                setComments(response);
            }
            
            console.log(response);
          }
        } catch (error) {
        console.error('Error al cargar los comentarios:', error);
      }
    };

    fetchComments();
  }, [refreshComments]);

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      try {
        setLoading(true);
        const token = await getToken();
        if(taskId && token){
            const response = await addComment({idTask:taskId,content:newComment},token);
            if ('error' in response) throw new Error;
            setNewComment('');
            setRefreshComments(prev => !prev);
            Toast.show({
                type: 'success',
                text1: 'Operacion exitosa',
                text2: 'Comentario enviado'
              }); 
        }
        else throw new Error;
      } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No se pudo guardar tu comentario.'
          }); 
      } finally{
        setLoading(false);
      } 

    }
  };
  const handleBack = () =>{
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
 <FlatList
      data={comments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.comment}>
          <Text style={styles.commentContent}>{item.content}</Text>
          <Text style={styles.commentAuthor}>{item.nameCreatedBy}</Text>
          
        </View>
      )}
    />
      <TextInput
        style={styles.input}
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Escribe un comentario..."
        multiline
      />
      <Button title="Agregar Comentario" onPress={handleAddComment} />
      <Button title="Volver" onPress={handleBack} />
      {loading && <Loader />}
    </View>
  );


};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    comment: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '41B39E', 
      },
    commentContent: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
      },
      commentAuthor: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
      },
    // ...otros estilos...
  });
export default ViewComments;
