import React,{FC} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import { View } from "react-native";

//screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AddTeamScreen from "../screens/AddTeamScreen";
import EditTeamScreen from "../screens/EditTeamScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const TeamStack = createStackNavigator();


const AppStack = () => {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
            tabBarActiveTintColor: 'purple',
            headerShown: false

        }}
        >
            <Tab.Screen 
            name = "Home" 
            component={TeamStackScreen}
            options={{
                tabBarLabel:'Equipos',
                tabBarIcon:({size}) =>(
                    <Icon name="account-multiple-outline" size={30}></Icon>
                ),             
            }}/>

            <Tab.Screen
             name = "Perfil"
             component={ProfileStackScreen}
             options={{
                tabBarLabel:'Perfil',
                tabBarIcon:({size}) =>(
                    <Icon name="account-circle" size={30}></Icon>
                ),}}/>
        </Tab.Navigator>
    )
}
export default AppStack;

const ProfileStackScreen : FC = (props)=> {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Perfil',
                    headerRight: () => (
                        <View style={{marginRight: 10}}>
                        <Icon.Button
                            name="account-edit"
                            size={25}
                            onPress={() => props.navigation.navigate('EditProfile')}
                        />
                        </View>
                    ),
                    }}
            />
            <ProfileStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                title: 'Editar Perfil',
                }}
              
                />
        </ProfileStack.Navigator>
    );
};

const TeamStackScreen:FC = (props) =>{
    return(
        <TeamStack.Navigator>
            <TeamStack.Screen
            name="HomeTeam"
            component={HomeScreen}
            options={{
            title: 'Equipos',
            }}/>
            <TeamStack.Screen
            name="AddTeam"
            component={AddTeamScreen}
            options={{
            title: 'Añadir equipo',
            }}/>
            <TeamStack.Screen
            name="EditTeam"
            component={EditTeamScreen}
            options={{
            title: 'Editar equipo',
            }}/>
           




        </TeamStack.Navigator>
    )
} 
