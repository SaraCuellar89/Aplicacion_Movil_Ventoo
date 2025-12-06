import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import estilos from "./css/Estilos_Menu";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

// ====== TIPO DE USUARIO ======
type Usuario = {
    Id_usuario: number;
    Nombre: string;
    Email: string;
    Rol: string;
};

const Caja_Opciones = () => {

    const navigation = useNavigation<navigationProp>();

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

    return (
        <>
            {info_usuario ? (
                <>
                    {info_usuario && info_usuario.Rol === 'Cliente' ? (
                    <View style={estilos.contenedor_opcion}>

                        <Text style={estilos.titulo_opciones}>Opciones</Text>

                        <View style={estilos.caja_info_usuario}>
                            <Text style={estilos.texto_btn_opcion}>{info_usuario.Nombre}</Text>
                            <Text style={estilos.texto_btn_opcion}>{info_usuario.Email}</Text>
                            <Text style={estilos.texto_btn_opcion}>{info_usuario.Rol}</Text>
                        </View>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Pedidos')}>
                            <Text style={estilos.texto_btn_opcion}>Pedidos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Compra')}>
                            <Text style={estilos.texto_btn_opcion}>Comprar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Carrito')}>
                            <Text style={estilos.texto_btn_opcion}>Carrito</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Buscar')}>
                            <Text style={estilos.texto_btn_opcion}>Buscar Producto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Inicio')}>
                            <Text style={estilos.texto_btn_opcion}>Chat Bot</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_cerrar_sesion} onPress={Cerrar_Sesion}>
                            <Text style={estilos.texto_btn_opcion}>Cerrar Sesion</Text>
                        </TouchableOpacity>

                    </View>
                ) : 
                (
                    <View style={estilos.contenedor_opcion}>

                        <Text style={estilos.titulo_opciones}>Opciones</Text>

                        <View style={estilos.caja_info_usuario}>
                            <Text style={estilos.texto_btn_opcion}>{info_usuario.Nombre}</Text>
                            <Text style={estilos.texto_btn_opcion}>{info_usuario.Email}</Text>
                            <Text style={estilos.texto_btn_opcion}>{info_usuario.Rol}</Text>
                        </View>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Productos_Vendedor')}>
                            <Text style={estilos.texto_btn_opcion}>Mis Productos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Registro_Productos')}>
                            <Text style={estilos.texto_btn_opcion}>Registrar Producto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Buscar')}>
                            <Text style={estilos.texto_btn_opcion}>Buscar Producto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Inicio')}>
                            <Text style={estilos.texto_btn_opcion}>Chat Bot</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_cerrar_sesion} onPress={Cerrar_Sesion}>
                            <Text style={estilos.texto_btn_opcion}>Cerrar Sesion</Text>
                        </TouchableOpacity>

                    </View>
                )}
                </>
                
            ) : (
                <View style={estilos.contenedor_opcion}>

                    <Text style={estilos.titulo_opciones}>Opciones</Text>

                    <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Inicio_Sesion')}>
                        <Text style={estilos.texto_btn_opcion}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Compra')}>
                        <Text style={estilos.texto_btn_opcion}>Ver Productos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.btn_opcion} onPress={() => navigation.navigate('Inicio')}>
                        <Text style={estilos.texto_btn_opcion}>Chat Bot</Text>
                    </TouchableOpacity>

                </View>
            )}
            
        </>
    );
};

export default Caja_Opciones;
