import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import estilos from '../Pantallas/css/Estilos_Principal';
import Tarjeta_Pedido from "../Componentes/Tarjeta_Pedido";
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

const Pedidos = () => {

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
                    <Tarjeta_Pedido
                        pedidos={pedidos}
                    />
                </View>
                
            </ScrollView>

            <Menu/>
            
        </SafeAreaView>
    )
}

export default Pedidos