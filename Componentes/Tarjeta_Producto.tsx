import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Props = {
    id_producto: number;
    imagen: string;
    nombre: string;
    precio: number;
};

const Tarjeta_Producto: React.FC<Props> = ({ id_producto, nombre, precio, imagen }) => {

    const navigation = useNavigation<navigationProp>();

    return(
        <TouchableOpacity style={estilos.contenedor_tarjeta_producto} onPress={() => navigation.navigate('Ver_Producto', { id_producto })}>
            <Image
                source={{ uri: imagen }}
                resizeMode="contain"
                style={estilos.img_tarjeta_producto}
            />
            
            <View style={estilos.caja_info_tarjeta_producto}>
                <Text style={estilos.nombre_tarjeta_producto}>{nombre}</Text>
                <Text style={estilos.precio_tarjeta_producto}>${precio}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Tarjeta_Producto