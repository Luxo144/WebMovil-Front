import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button,TouchableOpacity,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import { UpdateProfileData } from '../types/user';
import { updateProfileData } from '../services/auth.services';

const EditProfileScreen: FC = () => {

    // En un escenario real, obtendrías estos valores iniciales de algún lugar, 
    // como una tienda global, una base de datos, etc.
    const [image, setImage] = useState("https://via.placeholder.com/100");
    const [nick, setNick] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(" ");
    const [ubicacion, setUbicacion] = useState("");
    const [trabajo, setTrabajo] = useState("");

    const handleUpdate = () => {
        setImage("https://via.placeholder.com/150");
        //creo un const tipo UpdateProfiledata y le asigno las variables y llamo a la funcion UpdateProfileDto
        const update: UpdateProfileData = {
            nickname: nick,
            first_name: nombre,
            last_name: "null",
            job_position: trabajo,
            location: ubicacion,
            profile_picture: "",
            contact: phone,
        }
        try{
            console.log("updateProfileData:", updateProfileData )
            const response =  updateProfileData(update);

        }catch (error){

        }
    }


    return (
        <KeyboardAwareScrollView>

        <View style={styles.container}>

            <TouchableOpacity>
            <ImageBackground source={{ uri: image }} style={styles.profileImage} resizeMode="cover"/>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
            <Icon name='account-box' color='#777777' size={20}/>
            <TextInput style={styles.input} value={nick} onChangeText={setNick} placeholder="Nick" />
            </View>

            <View style={styles.inputContainer}>
            <Icon name='card-account-details' color='#777777' size={20}/>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" />
            </View>


            <View style={styles.inputContainer}>
            <Icon name='phone-dial' color='#777777' size={20}/>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Teléfono" />
            </View>

            <View style={styles.inputContainer}>
            <Icon name='source-commit-start-next-local' color='#777777' size={20}/>
            <TextInput style={styles.input} value={ubicacion} onChangeText={setUbicacion} placeholder="Ubicación" />
            </View>

            <View style={styles.inputContainer}>
            <Icon name='clipboard-text-outline' color='#777777' size={20}/>
            <TextInput style={styles.input} value={trabajo} onChangeText={setTrabajo} placeholder="Trabajo" />
            </View>
            <Button title="Actualizar" onPress={handleUpdate} />

        </View>
        </KeyboardAwareScrollView>
    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        alignItems: 'center',
    },
});

export default EditProfileScreen;