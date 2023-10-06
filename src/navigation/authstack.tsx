import React,{FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PassRecScreen from "../screens/PassRecScreen";
import HomeScreen from "../screens/HomeScreen";

const {Navigator,Screen} = createStackNavigator();

const AuthStack : FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name = "Login" component={LoginScreen}/>
            <Screen name = "Sign" component={SignUpScreen}/>
            <Screen name = "PassRec" component={PassRecScreen}/> 
            <Screen name = "Home" component={HomeScreen}/>         
        </Navigator>
    )
}
export default AuthStack;