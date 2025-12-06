import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Formularios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Formu_Inicio_Sesion = () => {

    const navigation = useNavigation<navigationProp>();

    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")


    const Iniciar_Sesion = async () => {
        try{
            const res = await fetch('https://backend-ventoo.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:correo, contrasena})
            })

            const datos = await res.json()

            if(!datos.success){
                return Alert.alert('No se pudo iniciar sesion')
            }

            //Guardar el token en el localstorage
            await AsyncStorage.setItem("token", datos.token);
            //const token = await AsyncStorage.getItem("token"); -- Leer token

            Alert.alert(`¡Hola ${datos.usuario.Nombre}!`);
            navigation.navigate('Opciones')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    return(
        <View style={estilos.contenedor_formu_inicio_sesion}>

            <Text style={estilos.titulo_formu_inicio_sesion}>Inicio de Sesión</Text>
            
            <View style={estilos.caja_inputs_formu_inicio_sesion}>
                <TextInput
                    placeholder="Correo" 
                    placeholderTextColor="#153B40" 
                    style={estilos.inputs_formu_inicio_sesion}
                    value={correo}
                    onChangeText={setCorreo}
                />

                <TextInput 
                    placeholder="Contraseña" 
                    placeholderTextColor="#153B40" 
                    secureTextEntry={true} 
                    style={estilos.inputs_formu_inicio_sesion}
                    value={contrasena}
                    onChangeText={setContrasena}
                />
            </View>

            <View style={estilos.caja_btns_formu_inicio_sesion}>
                <TouchableOpacity style={estilos.btn_entrar_formu_inicio_sesion} onPress={Iniciar_Sesion}>
                    <Text style={estilos.texto_btn_entrar_formu_inicio_sesion}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={estilos.texto_link_formu_inicio_sesion}>No tengo una cuenta</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Formu_Inicio_Sesion