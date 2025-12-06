import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Pantallas/css/Estilos_Principal';
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Formu_Editar_Producto from "../Componentes/Formu_Editar_Producto";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;
type VerProductoRouteProp = RouteProp<RootStackParamList, 'Editar_Producto'>;

const Editar_Producto = () => {

    const navigation = useNavigation<navigationProp>();

    const route = useRoute<VerProductoRouteProp>();
    const { id_producto } = route.params;

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

                <View style={estilos.caja_inicio_sesion}>

                    <Formu_Editar_Producto
                        id_producto={id_producto}
                    />

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Editar_Producto