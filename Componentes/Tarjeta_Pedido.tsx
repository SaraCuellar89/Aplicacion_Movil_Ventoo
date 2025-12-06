import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Menu'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Tarjeta_Pedido = () => {

    const navigation = useNavigation<navigationProp>();

    return(
        <TouchableOpacity style={estilos.contenedor_tarjeta_pedido} onPress={() => navigation.navigate('Ver_Pedido')}>
            <Text style={estilos.codigo_tarjeta_pedido}>Codigo: 45trg</Text>
            <Text style={estilos.texto_tarjeta_pedido}>29/11/2025</Text>
            <Text style={estilos.texto_tarjeta_pedido}>Productos: 4</Text>
        </TouchableOpacity>
    )
}

export default Tarjeta_Pedido