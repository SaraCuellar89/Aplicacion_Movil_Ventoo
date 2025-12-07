import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import estilos from '../Pantallas/css/Estilos_Principal';
import Info_Carrito from "../Componentes/Info_Carrito";
import Modal_Pago from "../Componentes/Modal_Pago";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;


type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
    Cantidad: number;
};

const Carrito = () => {

    const navigation = useNavigation<navigationProp>();


    // ============ Estado para ver el modal ============
    const [visible, setVisible] = useState(false);


    // ============ Estados necesarios para el renderizado de los productos ============
    const [productos, setProductos] = useState<Producto[]>([]);
    const [total, setTotal] = useState(0)


    // ============ Obtener productos apenas cargue la pagina ============
    useEffect(() => {
        const Obtener_Productos = async () => {

            const token = await AsyncStorage.getItem("token");

            try{
                const res = await fetch('https://backend-ventoo.vercel.app/carrito', {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                const datos = await res.json()
                setProductos(datos.carrito)

            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [setProductos])




    // ============ Eliminar productos del carrito ============
    const Eliminar_Producto_Carrito = (id_producto:number) => {
        Alert.alert(
            "Eliminar producto del carrito",
            "¿Quieres eliminar ese producto de tu carrito?",
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
                            const res = await fetch(`https://backend-ventoo.vercel.app/carrito/eliminar/${id_producto}`, {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                            })

                            const datos = await res.json()

                            if(!datos.success){
                                return Alert.alert('No se pudo quitar el producto de tu carrito')
                            }

                            setProductos(productos.filter(p => p.Id_producto !== id_producto))
                        } 
                        catch(error){
                            console.log('Error: ' + error)
                        }
                    }
                }
            ]
        )
    }



    // ============ Obtener total del carrito ============
    useEffect(() => {
        const total = productos.reduce((sum, p) => sum + Number(p.Precio) * Number(p.Cantidad), 0);
        setTotal(total);
    }, [productos]);



    // ============ Realizar Pedido ============

    const [metodoPago, setMetodo_Pago] = useState('')
    const [direccion, setDireccion] = useState('')


    const Pagar_Pedido = async () => {

        if (!direccion.trim()) {
            return Alert.alert("Ingresa una dirección válida");
        }

        if (!metodoPago) {
            return Alert.alert("Selecciona un método de pago");
        }

        Alert.alert(
            "Finalizar Pedido",
            "¿Quieres finalizar tu pedido?",
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
                            const res = await fetch('https://backend-ventoo.vercel.app/crear_pedido', {
                                method: "POST",
                                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                                body: JSON.stringify({direccion, metodoPago, total, productos})
                            })

                            const datos = await res.json()

                            if(!datos.success){
                                return Alert.alert('No se pudo realizar el pedido')
                            }

                            Alert.alert('¡Pedido Completado!')
                            navigation.navigate('Pedidos')
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

                <Info_Carrito
                    setVisible={setVisible}
                    productos={productos}
                    Eliminar_Producto_Carrito={Eliminar_Producto_Carrito}
                />

                <Modal_Pago
                    visible={visible}
                    setVisible={setVisible}
                    total={total}
                    direccion={direccion}
                    setDireccion={setDireccion}
                    metodoPago={metodoPago}
                    setMetodo_Pago={setMetodo_Pago}
                    Pagar_Pedido={Pagar_Pedido}
                />
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Carrito