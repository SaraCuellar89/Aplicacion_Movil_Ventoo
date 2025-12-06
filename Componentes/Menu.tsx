import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Menu'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Menu = () => {

    const navigation = useNavigation<navigationProp>();

    return(
        <View style={estilos.contenedor_menu}>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Image
                    source={require('../img/casa.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Compra')}>
                <Image
                    source={require('../img/bolsa-de-la-compra.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>

            <TouchableOpacity style={estilos.btn_img_opcion_menu} onPress={() => navigation.navigate('Carrito')}>
                <Image
                    source={require('../img/carrito-de-compras.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <Image
                    source={require('../img/robot.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
                <Image
                    source={require('../img/menu.png')}
                    resizeMode="contain"
                    style={estilos.img_opcion_menu}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Menu