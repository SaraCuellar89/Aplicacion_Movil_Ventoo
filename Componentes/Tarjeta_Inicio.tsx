import React from "react";
import { Image, Text, View, ImageSourcePropType, TouchableOpacity  } from "react-native";
import estilos from '../Componentes/css/Estilos_Encabezado';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

// Definimos las props que recibirá el componente
type TarjetaInicioProps = {
    texto: string;
    imagen: ImageSourcePropType; // Tipo para imágenes (require o uri)
    ruta: keyof RootStackParamList;
};


const Tarjeta_Inicio: React.FC<TarjetaInicioProps> = ({ texto, imagen, ruta }) => {

    const navigation = useNavigation<navigationProp>();

    return(
        <TouchableOpacity style={estilos.caja_tarjeta_inicio} onPress={() => navigation.navigate(ruta)}>
            <Text style={estilos.texto_tarjeta_inicio}>{texto}</Text>

            <Image
                source={imagen}
                resizeMode="contain"
                style={estilos.img_tarjeta_inicio}
            />
        </TouchableOpacity>
    )
}

export default Tarjeta_Inicio