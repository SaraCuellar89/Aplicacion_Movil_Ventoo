import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'
import Tarjeta_Producto from "./Tarjeta_Producto";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Props = {
    id_producto: number;
};

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};



const Info_Producto_Vendedor = ()=> {

    const navigation = useNavigation<navigationProp>();


    const [productos, setProductos] = useState<Producto[]>([]);

    // ============ Obtener todos los productos del vendedor ============
    useEffect(() => {

        const Obtener_Productos = async () => {

            const token = await AsyncStorage.getItem("token");

            try{
                const res = await fetch('https://backend-ventoo.vercel.app/productos_vendedor', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    }
                });

                const datos = await res.json()

                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])



    // ============ Funcion para eliminar productos ============
    const Eliminar_Producto = async (id_producto: number) => {
        Alert.alert(
            "Eliminar Producto",
            "¿Quieres eliminar este producto?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: async () => {
                        const token = await AsyncStorage.getItem("token");

                        try{
                            const res = await fetch(`https://backend-ventoo.vercel.app/eliminar_producto/${id_producto}`, {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                            })

                            const datos = await res.json()

                            if(!datos.success){
                                return Alert.alert('No se pudo eliminar el producto')
                            }

                            Alert.alert('Producto Eliminado')
                            setProductos(productos.filter(p => p.Id_producto !== id_producto));
                        }
                        catch(error){
                            console.log('Error: ' + error)
                        }
                    }
                }
            ]
        )
    }



    return(
        <View style={estilos.contenedor_info_carrito}>
            <Text style={estilos.titulo_info_carrito}>Tus Productos</Text>

            <View style={estilos.caja_productos_info_carrito}>

                {productos.length === 0 ?
                (
                    <Text>No hay productos</Text>
                ) : 
                (
                    <>
                        {productos.map((p) => (
                            <View style={estilos.producto_info_carrito} key={p.Id_producto}>
                                <Tarjeta_Producto
                                    id_producto={p.Id_producto}
                                    nombre={p.Nombre}
                                    precio={p.Precio}
                                    imagen={p.Imagen}
                                />
                                <TouchableOpacity style={estilos.btn_editar_tarjeta_resena} onPress={() => navigation.navigate('Editar_Producto', {id_producto: p.Id_producto})}>
                                    <Text style={estilos.texto_btn_editar_tarjeta_resena}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilos.btn_eliminar_info_carrito} onPress={() => Eliminar_Producto(p.Id_producto)}>
                                    <Text style={estilos.texto_btn_eliminar_info_carrito}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                )}

            </View>
        </View>
    )
}

export default Info_Producto_Vendedor