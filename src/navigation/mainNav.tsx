import React, {FC, useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authstack';
import AppStack from './appstack';


const MainNav : FC = () => {
    const [user,setUser] = useState<any>(null);

/* login con el backend

    const bootstrap = () => {
        if(_user){
            setUser(_user);
        }
    }
*/

    return(
        <NavigationContainer>           
            {user == null ? <AuthStack/> : <AppStack/> }
        </NavigationContainer>
    )
} 

export default MainNav;