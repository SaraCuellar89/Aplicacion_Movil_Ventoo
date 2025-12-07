import React, { useDebugValue, useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos from '../Pantallas/css/Estilos_Principal';
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Info_Producto_Vendedor from "../Componentes/Info_Producto_Vendedor";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};


const Productos_Vendedor = () => {

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

                <View>
                    <Info_Producto_Vendedor
                        productos={productos}
                        Eliminar_Producto={Eliminar_Producto}
                    />
                </View>
                
            </ScrollView>

            <Menu/>
            
        </SafeAreaView>
    )
}

export default Productos_Vendedor