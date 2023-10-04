import React,{FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const {Navigator,Screen} = createStackNavigator();

const AuthStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "Login" component={LoginScreen}/>
            <Screen name = "Sign" component={SignUpScreen}/>
        </Navigator>
    )
}
export default AuthStack;