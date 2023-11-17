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
import ProyectsScreen from "../screens/ProyectsScreen";
import ViewTeamScreen from "../screens/ViewTeamScreen";
import ProyInvitationScreen from "../screens/ProyInvitationScreen"
import TeamMembersScreen from "../screens/TeamMembersScreen";
import EditProyScreen from "../screens/EditProyScreen";
import ProyMembersScreen from "../screens/ProyMembersScreen";
import AddProyScreen from "../screens/AddProyScreen"; 

import TeamInvitationScreen from "../screens/TeamInvitationScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewProyectScreen from "../screens/ViewProyectScreen";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const TeamStack = createStackNavigator();
const ProyStack = createStackNavigator();


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
             name = "Proyectos"
             component={ProyStackScreen}
             options={{
                tabBarLabel:'Proyectos',
                tabBarIcon:({size}) =>(
                    <Icon name="list-status" size={30}></Icon>
                ),}}/>

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
            title: 'Mis Equipos',
            headerRight: () => (
                <View style={{marginRight: 10}}>
                <Icon.Button
                    name="account-multiple-plus-outline"
                    size={25}
                    onPress={() => props.navigation.navigate('ViewInvs')}
                />
                </View>
            ),
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
            <TeamStack.Screen
            name="ViewInvs"
            component={TeamInvitationScreen}
            options={{
            title:'Invitaciones de equipo'
            }}/>
            <TeamStack.Screen
            name="ProyInvs"
            component={ProyInvitationScreen}
            options={{
            title: 'Invitaciones de proyecto',
            }}/>
            <TeamStack.Screen
            name="ViewTeam"
            component={ViewTeamScreen}
            options={{
            title: 'Info Equipo',
            }}/>
            <TeamStack.Screen
            name="TeamMembersScreen"
            component={TeamMembersScreen}
            options={{
            title: 'Miembros',
            }}/>
            <TeamStack.Screen
            name="ProyMembers"
            component={ProyMembersScreen}
            options={{
            title: 'Equipos de proyecto',
            }}/>
            <TeamStack.Screen
            name="EditProy"
            component={EditProyScreen}
            options={{
            title: 'Editar Proyecto',
            }}/>

        </TeamStack.Navigator>
    )
}

const ProyStackScreen:FC = (props) =>{
    return(
        <ProyStack.Navigator>
            <ProyStack.Screen
            name = "Proyects"
            component={ProyectsScreen}
            options={{
                title: 'Mis Proyectos',
            }}
            />
            <ProyStack.Screen
            name = "ViewProyect"
            component={ViewProyectScreen}
            options={{
                title: 'Info Proyecto',
            }}
            />
            <ProyStack.Screen
            name="ProyMembers"
            component={ProyMembersScreen}
            options={{
            title: 'Equipos de proyecto',
            }}/>
            <ProyStack.Screen
            name="EditProy"
            component={EditProyScreen}
            options={{
            title: 'Editar Proyecto',
            }}/>
            <ProyStack.Screen
            name="AddProy"
            component={AddProyScreen}
            options={{
            title: 'Crear Proyecto',
            }}/>

        </ProyStack.Navigator>
    )
}
