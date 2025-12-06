import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Tarjeta_Producto from "../Componentes/Tarjeta_Producto";
import estilos from '../Pantallas/css/Estilos_Principal';
import Menu from "../Componentes/Menu";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;
type VerProductoRouteProp = RouteProp<RootStackParamList, 'Ver_Pedido'>;

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};

const Ver_Pedido = () => {

    const navigation = useNavigation<navigationProp>();

    const route = useRoute<VerProductoRouteProp>();
    const { id_pedido } = route.params;


    // ============ Obtener Todos los productos del pedido ============
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const Obtener_Info_Producto = async () => {

            const token = await AsyncStorage.getItem("token");

            try{
                const res = await fetch(`https://backend-ventoo.vercel.app/pedido/${id_pedido}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                const datos = await res.json()

                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Producto()
    }, [])

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>
        
            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <Encabezado/>

                <TouchableOpacity style={estilos.btn_ver} onPress={() => navigation.goBack()}>
                    <Text style={estilos.texto_btn_ver}>{'<<'} Regresar</Text>
                </TouchableOpacity>

                <View style={estilos.caja_resenas_ver_productos}>

                    <View style={estilos.caja_tarjetas_productos_buscar}>
                        {productos.length === 0 ? 
                        (
                            <Text>Cargando...</Text>
                        ) : 
                        (
                            <>
                                {productos.map((p) => (
                                    <Tarjeta_Producto
                                        key={p.Id_producto}
                                        id_producto={p.Id_producto}
                                        nombre={p.Nombre}
                                        precio={p.Precio}
                                        imagen={p.Imagen}
                                    />
                                ))}
                            </>
                        )}
                    </View>
                    

                </View>
                
            </ScrollView>

            <Menu/>
            
        </SafeAreaView>
    )
}

export default Ver_Pedido