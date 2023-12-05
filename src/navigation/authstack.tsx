import React,{FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen,SignUpScreen,PassRecScreen,ChangePassScreen } from "../screens/AuthScreens";
import { AuthStackParamList } from "../../ParamLists";


const Stack = createStackNavigator<AuthStackParamList>();


const AuthStack : FC = () => {
    
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
            <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name = "PassRecScreen" component={PassRecScreen}/>
            <Stack.Screen name = "ChangePassScreen" component={ChangePassScreen}/>         
        </Stack.Navigator>
    )
}
export default AuthStack;