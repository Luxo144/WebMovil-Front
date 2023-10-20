import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () =>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    
    return(
      <View style={styles.container}>
          <View>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} resizeMode="cover"/>
          </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
          <Icon name='account-box' color='#777777' size={20}/>           
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}}>Nick</Text>
          </View>
          <View style={styles.row}>
          <Icon name='card-account-details' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}}>Nombre</Text>
          </View>
          <View style={styles.row}>
          <Icon name='email' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >correo@gmail.com</Text>
          </View>
          <View style={styles.row}>
          <Icon name='phone-dial' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >+569 11111111</Text>
          </View>
          <View style={styles.row}>
          <Icon name='source-commit-start-next-local' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >ubicacion</Text>
          </View>
          <View style={styles.row}>
          <Icon name='clipboard-text-outline' color='#777777' size={20}/>
          <Text style={{color:'#777777', marginLeft: 20, fontSize:20}} >trabajo</Text>
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