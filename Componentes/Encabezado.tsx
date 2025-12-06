import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Encabezado';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Encabezado = () => {

    const navigation = useNavigation<navigationProp>();

    const Ir_Buscar = () => {
        navigation.navigate('Buscar')
    }

    return(
        <View style={estilos.fondo}>
            <Image
                source={require('../img/titulo.png')}
                resizeMode="contain"
                style={estilos.logo}
            />

            <TouchableOpacity style={estilos.caja_lupa} onPress={Ir_Buscar}>
                <Image
                    source={require('../img/lupa.png')}
                    resizeMode="contain"
                    style={estilos.lupa}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Encabezado