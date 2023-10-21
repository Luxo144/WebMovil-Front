import React, {FC, useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authstack';
import AppStack from './appstack';
import AuthContext from './AuthContext';

const MainNav : FC = () => {
    const [user,setUser] = useState(false);
    return(
        <AuthContext.Provider value={{ user, setUser }}>
            <NavigationContainer>           
                {user ? <AppStack/>:<AuthStack/> }
            </NavigationContainer>
        </AuthContext.Provider>
    )
} 

export default MainNav;