import React,{FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PassRecScreen from "../screens/PassRecScreen";
import ChangePassScreen from "../screens/ChangePassScreen";


const {Navigator,Screen} = createStackNavigator();


const AuthStack : FC = () => {
    
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "Login" component={LoginScreen}/>
            <Screen name = "Sign" component={SignUpScreen}/>
            <Screen name = "PassRec" component={PassRecScreen}/>
            <Screen name = "ChangePass" component={ChangePassScreen}/>         
        </Navigator>
    )
}
export default AuthStack;