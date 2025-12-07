import React, { useEffect, useState } from "react";
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";
import Tarjeta_Producto from "./Tarjeta_Producto";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'
import AsyncStorage from "@react-native-async-storage/async-storage";

type CarritoModalPagoProps = {
    productos: Producto[]
    setVisible: (value: boolean) => void;
    Eliminar_Producto_Carrito: (value: number) => void;
}

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
    Cantidad: number;
};


const Info_Carrito: React.FC<CarritoModalPagoProps> = ({ setVisible, productos, Eliminar_Producto_Carrito }) => {

    const [aceptar, setAceptar] = useState(false)

    return(
        <View style={estilos.contenedor_info_carrito}>

            <Text style={estilos.titulo_info_carrito}>Tu Carrito</Text>
            
            {productos.length === 0 ?
            (
                <Text>No hay productos</Text>
            ) : 
            (
                <>
                    <View style={estilos.caja_productos_info_carrito}>
                        {productos.map((p) => {
                            const subtotal = Number(p.Precio) * Number(p.Cantidad);
                            return(
                                <View style={estilos.producto_info_carrito} key={p.Id_producto}>
                                    <Tarjeta_Producto
                                        id_producto={p.Id_producto}
                                        nombre={p.Nombre}
                                        precio={p.Precio}
                                        imagen={p.Imagen}
                                    />
                                    <Text>Cantidad: {p.Cantidad}</Text>
                                    <Text>SubTotal: ${subtotal.toLocaleString()}</Text>
                                    <TouchableOpacity style={estilos.btn_eliminar_info_carrito} onPress={() => Eliminar_Producto_Carrito(p.Id_producto)}>
                                        <Text style={estilos.texto_btn_eliminar_info_carrito}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}

                    </View>

                    <View style={estilos.caja_pregunta_info_carrito}>
                        <Switch
                            value={aceptar}
                            onValueChange={setAceptar}
                        />
                        <Text>No puedes cancelar el pedido una vez realizado.</Text>
                    </View>

                    <>
                        {aceptar === false ? 
                        (
                            <TouchableOpacity style={estilos.btn_desactivado_info_carrito} disabled={true}>
                                <Text style={estilos.texto_btn_comprar_info_carrito}>Comprar</Text>
                            </TouchableOpacity>
                        ) : 
                        (
                            <TouchableOpacity style={estilos.btn_comprar_info_carrito}  onPress={() => setVisible(true)}>
                                <Text style={estilos.texto_btn_comprar_info_carrito}>Comprar</Text>
                            </TouchableOpacity>
                        )}
                    </>
                </>
            )}
        </View>
    )
}

export default Info_Carrito