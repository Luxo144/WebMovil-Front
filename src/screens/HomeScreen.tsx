import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HomeScreen:FC = () => {

    return (
        <View style ={styles.container}>
          <Text>Home</Text>               
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  
  });

export default HomeScreen;