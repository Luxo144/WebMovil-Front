import React, { FC, useState,useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, Button,TouchableOpacity,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import { UpdateUserDto } from '../../types/auth/user';
import { updateUserData, getUserData} from '../../services/auth/auth.services';
import { ProfileStackParamList } from "../../../ParamLists";
import { StackScreenProps } from "@react-navigation/stack";
import { getToken } from '../../services/token.service';
import { Loader } from '../../components';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<ProfileStackParamList,"EditProfile">

const EditProfileScreen: FC<Props> = ({navigation}) => {


    const [image, setImage] = useState("https://via.placeholder.com/100");
    const [nick, setNick] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [trabajo, setTrabajo] = useState("");
    const [loading,setLoading] = useState(false);
    
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      const isValidPhoneNumber = (phoneNumber:string) => {
        const phoneNumberRegex = /^[0-9]{9}$/; 
        return phoneNumberRegex.test(phoneNumber);
      };


    useEffect(() => {
       
          const fetchData = async () => {
              try {
                  const token = await getToken(); // Asegúrate de esperar la promesa aquí.
                  console.log("Tokenfetch: ", token)
                  if (token) { // Verifica que el token no sea null antes de proceder.
                      const details = await getUserData(token);
                      if(!("error" in details)){
                      setNick(details.profile.nickname);
                      setNombre(details.profile.first_name);
                      setEmail(details.email);
                      setPhone(details.profile.contact);
                      setUbicacion(details.profile.location);
                      setTrabajo(details.profile.job_position);
                    }
                  } else {
                      console.error("Token is null.");
                  }
              } catch (error) {
                  console.error("Error fetching user details:", error);
              }
          };
          fetchData(); 
        
      }, []);

    const handleUpdate =  async () => {

        setImage("https://via.placeholder.com/150");
        if (!nick || !nombre || !trabajo || !ubicacion || !phone || !email){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Porfavor llene los campos.'
              });
              return;
        }

        if(!isValidEmail(email)){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Ingrese un email valido'
              });
              return;
        }
        if (!isValidPhoneNumber(phone)){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Ingrese un numero valido (9 digitos)'
              });
              return;
        }

        const update: UpdateUserDto = {
            email: email,
            nickname: nick,
            first_name: nombre,
            last_name: "null",
            job_position: trabajo,
            location: ubicacion,
            profile_picture: image,
            contact: phone,
        }
        const tok =  await getToken();
        console.log("Update: ", update)
        console.log("Tokennnn: ", tok)

        if(typeof tok == 'string'){
            try{
                setLoading(true);
                const response =  updateUserData(update,tok);
                if('error' in response) throw new Error();
                
                navigation.goBack();
                Toast.show({
                    type: 'success',
                    text1: 'Exito',
                    text2: 'Datos actualizados correctamente.'
                  });
            }catch (error){
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Hubo un error al actualizar los datos.'
                  });
            }finally{
                setLoading(false);
            }
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
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
            </View>

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

            {loading && <Loader />}
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