import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Caja_Opciones from "../Componentes/Caja_Opciones";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Usuario = {
    Id_usuario: number;
    Nombre: string;
    Email: string;
    Rol: string;
};

const Opciones = () => {

    const navigation = useNavigation<navigationProp>();


    // ============ Obtener la informacion del usuario en sesion ============
    const [info_usuario, setInfo_usuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const Obtener_Info_Usuario = async () => {

            const token = await AsyncStorage.getItem("token");

            try {
                const res = await fetch('https://backend-ventoo.vercel.app/usuario_logueado', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const datos = await res.json();

                console.log(datos)

                if (datos.success) {
                    setInfo_usuario(datos.usuario);
                } else {
                    setInfo_usuario(null);
                }

            } catch (error) {
                console.error('Error: ' + error);
            }
        };

        Obtener_Info_Usuario();
    }, []);



    // ============ Funcion para cerrar sesion ============
    const Cerrar_Sesion = () => {
        Alert.alert(
            "Cerrar sesión",
            "Quieres salir de tu cuenta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem("token");
                            Alert.alert("¡Cerraste sesión!");
                            navigation.navigate("Inicio");
                        } catch (error) {
                            console.log("Error:", error);
                            Alert.alert("No se pudo cerrar sesión");
                        }
                    }
                }
            ]
        );
    };

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <View>
                    <Encabezado/>

                    <Caja_Opciones
                        info_usuario={info_usuario}
                        Cerrar_Sesion={Cerrar_Sesion}
                    />
                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Opciones