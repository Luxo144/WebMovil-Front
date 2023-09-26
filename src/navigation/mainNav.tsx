import React, {FC, useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authstack';

const MainNav : FC = () => {
    return(
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    )
} 

export default MainNav;