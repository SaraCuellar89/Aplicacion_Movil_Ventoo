import React, { useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import estilos from '../Pantallas/css/Estilos_Principal';

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Principal = () => {

    const navigation = useNavigation<navigationProp>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Inicio')
        }, 3000)

        // Limpiar el timer si el componente se desmonta antes
        return () => clearTimeout(timer)
    }, []);
    

    return(
        <View style={estilos.fondo_principal}>
            <Image
                source={require('../img/titulo.png')}
                style={estilos.logo}
                resizeMode="contain"
            />
        </View>
    );
};

export default Principal;
