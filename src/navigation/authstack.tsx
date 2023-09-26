import React,{FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/LoginScreen";

const {Navigator,Screen} = createStackNavigator();

const AuthStack : FC = () => {
    return (
        <Navigator>
            <Screen name = "Login" component={LoginScreen}/>
            <Screen name = "SingUp" component={SignUpScreen}/>
        </Navigator>
    )
}
export default AuthStack;