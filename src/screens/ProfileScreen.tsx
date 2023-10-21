import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getToken } from '../services/auth.services';
import { getUserDetailsCombined } from '../services/auth.services';

const ProfileScreen = () =>{

    const [userDetails, setUserDetails] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken(); // Asegúrate de esperar la promesa aquí.
                console.log(token)
                if (token) { // Verifica que el token no sea null antes de proceder.
                    const details = await getUserDetailsCombined(token);
                    setUserDetails(details);
                } else {
                    console.error("Token is null.");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
    
        fetchData(); // Invoca la función fetchData.
    }, []);
    

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
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}}>{userDetails.nickname}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='card-account-details' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}}>{userDetails.name_}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='email' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.email}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='phone-dial' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.phone}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='source-commit-start-next-local' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.ubication}</Text>
          </View>
          <View style={styles.row}>
          <Icon name='clipboard-text-outline' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >{userDetails.job_title}</Text>
          </View>
        </View>
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