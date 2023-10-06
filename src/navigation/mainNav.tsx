import React, {FC, useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authstack';
import AppStack from './appstack';


const MainNav : FC = () => {
    const [user,setUser] = useState<any>(null);
    return(
        <NavigationContainer>           
            {user == null ? <AuthStack/> : <AppStack/> }
        </NavigationContainer>
    )
} 

export default MainNav;