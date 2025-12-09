import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Menu'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Usuario = {
    Id_usuario: number;
    Nombre: string;
    Email: string;
    Rol: string;
}

const Menu = () => {

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



    return(
        <View style={estilos.contenedor_menu}>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Image
                    source={require('../img/casa.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Compra')}>
                <Image
                    source={require('../img/bolsa-de-la-compra.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>

            {info_usuario?.Rol === 'Cliente' ? (
                <TouchableOpacity style={estilos.btn_img_opcion_menu} onPress={() => navigation.navigate('Carrito')}>
                    <Image
                        source={require('../img/carrito-de-compras.png')}
                        resizeMode="contain"
                        style={estilos.img_opcion_menu}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={estilos.btn_img_opcion_menu} onPress={() => Alert.alert('Debes iniciar sesion como cliente')}>
                    <Image
                        source={require('../img/carrito-de-compras.png')}
                        resizeMode="contain"
                        style={estilos.img_opcion_menu}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Chat_Bot')}>
                <Image
                    source={require('../img/robot.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
                <Image
                    source={require('../img/menu.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Menu