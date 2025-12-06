import React from "react";
import { Image, Text, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Encabezado';

const Carrusel = () => {
    return(
        <View style={estilos.contenedor_carrusel}>
            <Image
                source={require('../img/banner_3.gif')}
                resizeMode="cover"
                style={estilos.img_carrusel}
            />
        </View>
    )
}

export default Carrusel