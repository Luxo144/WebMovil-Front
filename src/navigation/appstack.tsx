import React,{FC} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import { View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//screens
import {ProfileScreen,EditProfileScreen} from "../screens/ProfileScreens";
import {AddTeamScreen,EditTeamScreen,ViewTeamScreen,ProyInvitationScreen,
TeamMembersScreen,AddMemberScreen,TeamInvitationScreen,TeamScreen,EditMemberScreen} from "../screens/TeamScreens";
import {ProyectsScreen,EditProyScreen,ProyMembersScreen,AddProyScreen,ViewProyectScreen,TasksScreen,ViewTask,AddTask,InvTeamScreen,ViewComments} from "../screens/ProyScreens";




import { ProfileStackParamList,TeamStackParamList,ProyStackParamList } from "../../ParamLists";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const TeamStack = createStackNavigator<TeamStackParamList>();
const ProyStack = createStackNavigator<ProyStackParamList>();


const AppTab:FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="TeamScreenStack"
            screenOptions={{
            tabBarActiveTintColor: 'purple',
            headerShown: false

        }}
        >
            <Tab.Screen 
            name = "TeamScreenStack" 
            component={TeamStackScreen}
            options={{
                tabBarLabel:'Equipos',
                tabBarIcon:({size}) =>(
                    <Icon name="account-multiple-outline" size={30}></Icon>
                ),             
            }}/>
                        
            <Tab.Screen
             name = "ProyectsScreenStack"
             component={ProyStackScreen}
             options={{
                tabBarLabel:'Proyectos',
                tabBarIcon:({size}) =>(
                    <Icon name="list-status" size={30}></Icon>
                ),}}/>

            <Tab.Screen
             name = "ProfileScreenStack"
             component={ProfileStackScreen}
             options={{
                tabBarLabel:'Perfil',
                tabBarIcon:({size}) =>(
                    <Icon name="account-circle" size={30}></Icon>
                ),}}/>

        </Tab.Navigator>
    )
}
export default AppTab;

const ProfileStackScreen : FC = ()=> {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={({ navigation }) => ({
                    title: 'Perfil',
                    headerRight: () => (
                        <View style={{ marginRight: 10 }}>
                            <Icon.Button
                                name="account-edit"
                                size={25}
                                onPress={() => navigation.navigate('EditProfile')}
                            />
                        </View>
                    ),
                })}
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

const TeamStackScreen:FC = () =>{
    return(
        <TeamStack.Navigator>
            <TeamStack.Screen
                name="TeamScreen"
                component={TeamScreen}
                options={({ navigation }) => ({
                    title: 'Mis Equipos',
                    headerRight: () => (
                        <View style={{ marginRight: 10 }}>
                            <Icon.Button
                                name="account-multiple-plus-outline"
                                size={25}
                                onPress={() => navigation.navigate('TeamInvitationScreen')}
                            />
                        </View>
                    ),
                })}
            />
            <TeamStack.Screen
                name="AddTeamScreen"
                component={AddTeamScreen}
                options={{
                title: 'Añadir equipo',
            }}/>
            <TeamStack.Screen
                name="EditTeamScreen"
                component={EditTeamScreen}
                options={{
                title: 'Editar equipo',
            }}/>
            <TeamStack.Screen
                name="TeamInvitationScreen"
                component={TeamInvitationScreen}
                options={{
                title:'Invitaciones de equipo'
            }}/>
            <TeamStack.Screen
                name="ProyInvitationScreen"
                component={ProyInvitationScreen}
                options={{
                title: 'Invitaciones de proyecto',
            }}/>
            <TeamStack.Screen
                name="ViewTeamScreen"
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
            name="ProyMembersScreen"
                component={ProyMembersScreen}
                options={{
                title: 'Equipos de proyecto',
            }}/>
            <TeamStack.Screen
                name="EditProyScreen"
                component={EditProyScreen}
                options={{
                title: 'Editar Proyecto',
            }}/>
            <TeamStack.Screen
                name="AddMemberScreen"
                component={AddMemberScreen}
                options={{
                title: 'Añadir miembro',
            }}/>
            <TeamStack.Screen
                name="EditMemberScreen"
                component={EditMemberScreen}
                options={{
                title: 'Añadir miembro',
            }}/>
            

        </TeamStack.Navigator>
    )
}

const ProyStackScreen:FC = () =>{
    return(
        <ProyStack.Navigator>
            <ProyStack.Screen
                name = "ProyectsScreen"
                component={ProyectsScreen}
                options={{
                title: 'Mis Proyectos',
            }}
            />
            <ProyStack.Screen
                name = "ViewProyectScreen"
                component={ViewProyectScreen}
                options={{
                title: 'Info Proyecto',
            }}
            />
            <ProyStack.Screen
                name="ProyMembersScreen"
                component={ProyMembersScreen}
                options={{
                title: 'Equipos de proyecto',
            }}/>
            <ProyStack.Screen
                name="EditProyScreen"
                component={EditProyScreen}
                options={{
                title: 'Editar Proyecto',
            }}/>
            <ProyStack.Screen
                name="AddProyScreen"
                component={AddProyScreen}
                options={{
                title: 'Crear Proyecto',
            }}/>
            <ProyStack.Screen
                name="TaskScreen"
                component={TasksScreen}
                options={{
                title: 'Tareas',
            }}/>
            <ProyStack.Screen
                name="ViewTask"
                component={ViewTask}
                options={{
                title: 'Info Tarea',
            }}/>
            <ProyStack.Screen
                name="AddTask"
                component={AddTask}
                options={{
                title: 'Crear tarea',
            }}/>
            <ProyStack.Screen
                name="InvTeamScreen"
                component={InvTeamScreen}
                options={{
                title: 'Crear tarea',
            }}/>
            <ProyStack.Screen
                name="ViewComments"
                component={ViewComments}
                options={{
                title: 'Crear tarea',
            }}/>

        </ProyStack.Navigator>
    )
}
