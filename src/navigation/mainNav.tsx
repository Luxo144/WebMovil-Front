import React, {FC, useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authstack';
import AppTab from './appstack';
import AuthContext from './AuthContext';

const MainNav : FC = () => {
    const [user,setUser] = useState(false);
    return(
        <AuthContext.Provider value={{ user, setUser }}>
            <NavigationContainer>           
                {user ? <AppTab/>:<AuthStack/> }
            </NavigationContainer>
        </AuthContext.Provider>
    )
} 

export default MainNav;