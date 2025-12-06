import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Tarjeta_Producto from "../Componentes/Tarjeta_Producto";
import estilos from '../Pantallas/css/Estilos_Principal';
import Menu from "../Componentes/Menu";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Ver_Pedido = () => {

    const navigation = useNavigation<navigationProp>();

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

                    <Text style={estilos.texto_btn_ver}>Codigo: 564gtr</Text>

                    <View style={estilos.caja_tarjetas_productos_buscar}>
                        <Tarjeta_Producto/>
                        <Tarjeta_Producto/>
                        <Tarjeta_Producto/>
                    </View>
                    

                </View>
                
            </ScrollView>

            <Menu/>
            
        </SafeAreaView>
    )
}

export default Ver_Pedido