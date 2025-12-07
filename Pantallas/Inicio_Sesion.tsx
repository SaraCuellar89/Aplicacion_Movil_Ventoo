import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Formu_Inicio_Sesion from "../Componentes/Formu_Inicio_Sesion";
import estilos from '../Pantallas/css/Estilos_Principal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;


const Inicio_Sesion = () => {

    const navigation = useNavigation<navigationProp>();


    // ============ Funcion para iniciar sesion ============
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <Encabezado/>

                <View style={estilos.caja_inicio_sesion}>

                    <Formu_Inicio_Sesion
                        correo={correo}
                        setCorreo={setCorreo}
                        contrasena={contrasena}
                        setContrasena={setContrasena}
                        Iniciar_Sesion={Iniciar_Sesion}
                    />

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Inicio_Sesion