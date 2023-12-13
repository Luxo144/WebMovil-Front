import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileStackParamList } from "../../../ParamLists";
import { StackScreenProps } from "@react-navigation/stack";
import { getToken } from '../../services/token.service';
import  { getUserData, updateUserData } from '../../services/auth/auth.services';
import { useIsFocused } from '@react-navigation/native';
import { Loader } from '../../components';

type Props = StackScreenProps<ProfileStackParamList,"ProfileScreen">

const ProfileScreen:FC<Props> = () =>{

    const [userDetails, setUserDetails] = useState<any | null>(null);
    const [loading,setLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
      if(isFocused) {
        const fetchData = async () => {
            try {
                const token = await getToken(); // Asegúrate de esperar la promesa aquí.
                console.log("Token: ", token)
                if (token) { // Verifica que el token no sea null antes de proceder.
                    const details = await getUserData(token);
                    console.log("Details: ", details)
                    setUserDetails(details);
                } else {
                    console.error("Token is null.");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally{
              setLoading(false);
            }
        };
        fetchData(); // Invoca la función fetchData.
      }
    }, [isFocused]);
    

    if (!userDetails) {
        return <Text>Loading...</Text>; // Puedes mostrar un indicador de carga aquí.
    }

    console.log(userDetails);
    
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