import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Modal'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Boton_Registrar = () => {

    const navigation = useNavigation<navigationProp>();

    return(
        <View style={estilos.contenedor_boton_registrar}>

            <TouchableOpacity style={estilos.boton_registrar} onPress={() => navigation.navigate('Registro_Productos')}>
                <Text style={estilos.mas_boton_registrar}>+</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Boton_Registrar