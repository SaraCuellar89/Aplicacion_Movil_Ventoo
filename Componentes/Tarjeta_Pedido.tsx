import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Menu'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;


type Pedido = {
    Id_pedido: number;
    Estado_pedido: string;
    Fecha_pedido: string;
    Total: number;
}


const Tarjeta_Pedido = () => {

    const navigation = useNavigation<navigationProp>();

    const [pedidos, setPedidos] = useState<Pedido[]>([])

    // ============ Obtener todos los pedidos del cliente ============
    useEffect(() => {
        const Obtener_Pedidos = async () => {

            const token = await AsyncStorage.getItem("token");

            try{
                const res = await fetch('https://backend-ventoo.vercel.app/pedidos_cliente', {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                const datos = await res.json()
                setPedidos(datos.pedidos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Pedidos()
    }, [])

    return(
        <>
            {pedidos.length === 0 ?
            (
                <Text>No hay pedidos</Text>
            ) : 
            (
                <>
                    {pedidos.map((p) => (
                        <TouchableOpacity style={estilos.contenedor_tarjeta_pedido} onPress={() => navigation.navigate('Ver_Pedido', {id_pedido: p.Id_pedido})}>
                            <Text style={estilos.codigo_tarjeta_pedido}>Estado: {p.Estado_pedido}</Text>
                            <Text style={estilos.texto_tarjeta_pedido}>Fecha: {p.Fecha_pedido.slice(0, 10)}</Text>
                            <Text style={estilos.texto_tarjeta_pedido}>Productos: {p.Total}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}
        </>
    )
}

export default Tarjeta_Pedido