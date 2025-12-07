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
    productos: Producto[];
    Eliminar_Producto: (valor: number) => void;
};

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};


const Info_Producto_Vendedor: React.FC<Props> = ({productos, Eliminar_Producto})=> {

    const navigation = useNavigation<navigationProp>();

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