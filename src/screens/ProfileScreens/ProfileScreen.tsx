import React, { FC, useEffect, useState , useContext} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileStackParamList } from "../../../ParamLists";
import { StackScreenProps } from "@react-navigation/stack";
import { getToken } from '../../services/token.service';
import  { getUserData, updateUserData } from '../../services/auth/auth.services';
import { useIsFocused } from '@react-navigation/native';
import { Loader, Button } from '../../components';
import AuthContext from '../../navigation/AuthContext';
import { logout } from '../../services/auth/auth.services';
import Toast from 'react-native-toast-message';
import useIdStore from '../../services/useIdStore';
import {UserDataResponse} from '../../types/auth/user';
type Props = StackScreenProps<ProfileStackParamList,"ProfileScreen">

const ProfileScreen:FC<Props> = () =>{
    const clearIds = useIdStore(state => state.clearIds);
    const [userDetails, setUserDetails] = useState<UserDataResponse | null>(null);
    const [loading,setLoading] = useState(true);
    const isFocused = useIsFocused();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
      if (isFocused) {
        const fetchData = async () => {
          try {
            setLoading(true);
            const token = await getToken();
            if (token) {
              const response = await getUserData(token);
              if ('error' in response) {
                // Manejo del error
                console.error("Error fetching user details:", response.error);
              } else {
                // Asegúrate de que la respuesta es del tipo UserDetails
                setUserDetails(response as UserDataResponse);
              }
            } else {
              console.error("Token is null.");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    }, [isFocused]);
    

    if (!userDetails) {
        return <Loader/>; // Puedes mostrar un indicador de carga aquí.
    }

    console.log(userDetails);
    
    const handleLogout = async () =>{
      setLoading(true);
      const response = await logout();
      setLoading(false);
      if ('error' in response){
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error al cerrar sesión'
        });
        return;
      }
      clearIds(); 
      Toast.show({
        type: 'success',
        text1: 'Exito',
        text2: 'Sesión cerrada con éxito'
      });
      setUser(false);

      return;  
      
    }

    return(
      <View style={styles.container}>
          <View>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} resizeMode="cover"/>
          </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
          <Icon name='account-box' color='#777777' size={20}/>           
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}}>{userDetails.profile.nickname}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='card-account-details' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}}>{userDetails.profile.first_name}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='email' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.email}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='phone-dial' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.profile.contact}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='source-commit-start-next-local' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.profile.location}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='clipboard-text-outline' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.profile.job_position}</Text>
          </View>
          <Button title='Cerrar sesión' onPress={handleLogout}/>

        </View>

        {loading && <Loader />}
      </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,  
        marginBottom: 20,   
      },
    row:{
      flexDirection: 'row',
      marginBottom: 10,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },

  });

export default ProfileScreen;