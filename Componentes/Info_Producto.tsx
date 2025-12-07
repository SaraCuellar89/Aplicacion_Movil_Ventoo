import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    info_Producto: Info_Producto | null;
    Disminuir: () => void;
    cantidad: number;
    Aumentar: () => void;
    Agregar_Carrito: () => void;
    info_usuario: Usuario | null; 
};

type Usuario = {
    Id_usuario: number;
    Nombre: string;
    Email: string;
    Rol: string;
}


type Info_Producto = {
    Nombre: string;
    Imagen: string;
    Descripcion: string;
    Precio: number;
};

const Info_Producto: React.FC<Props> = ({ info_Producto, Disminuir, cantidad, Aumentar, Agregar_Carrito, info_usuario }) => {
    return(
        <View style={estilos.contenedor_info_producto}>

            {info_Producto === null ? 
            (
                <Text>Cargando...</Text>
            ) : 
            (
                <>
                    <View style={estilos.caja_info_producto}>
                
                        <Text style={estilos.titulo_info_producto}>{info_Producto.Nombre}</Text>

                        <Image
                            source={{ uri: info_Producto.Imagen }}
                            resizeMode="contain"
                            style={estilos.img_info_producto}
                        />

                        <Text style={estilos.descripcion_info_producto}>{info_Producto.Descripcion}</Text>

                        <Text style={estilos.precio_info_producto}>${info_Producto.Precio}</Text>

                        {/* <Text style={estilos.cantidad_info_producto}>Cantidad: 10</Text> */}

                        <View style={estilos.caja_cantidad_info_producto}>

                            <TouchableOpacity onPress={Disminuir} style={estilos.boton_info_producto}>
                                <Text style={estilos.texto_boton_info_producto}>-</Text>
                            </TouchableOpacity>
                            

                            <Text style={estilos.precio_info_producto}>{cantidad}</Text>

                            <TouchableOpacity onPress={Aumentar} style={estilos.boton_info_producto}>
                                <Text style={estilos.texto_boton_info_producto}>+</Text>
                            </TouchableOpacity>

                        </View>

                        {info_usuario ? (
                            <>
                                {info_usuario.Rol === 'Cliente' ? 
                                (
                                    <TouchableOpacity style={estilos.btn_subir_formu_resena} onPress={Agregar_Carrito}>
                                        <Text style={estilos.texto_btn_comprar_info_carrito}>Agregar</Text>
                                    </TouchableOpacity>
                                ) : 
                                (
                                    <TouchableOpacity style={estilos.btn_desactivado_info_carrito} disabled={true}>
                                        <Text style={estilos.texto_btn_subir_formu_resena}>Agregar</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : 
                            <TouchableOpacity style={estilos.btn_desactivado_info_carrito} disabled={true}>
                                <Text style={estilos.texto_btn_subir_formu_resena}>Agregar</Text>
                            </TouchableOpacity>
                        }

                    </View>

                    <View style={estilos.caja_vendedor_info_producto}>

                        <Image
                            source={require('../img/avatar.png')}
                            resizeMode="contain"
                            style={estilos.img_vendedor_info_producto}
                        />

                        <Text>Vendedor</Text>

                    </View>
                </>
            )}
        </View>
    )
}

export default Info_Producto