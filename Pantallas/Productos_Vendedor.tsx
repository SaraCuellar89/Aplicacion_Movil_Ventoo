import React, { useDebugValue } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos from '../Pantallas/css/Estilos_Principal';
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Info_Producto_Vendedor from "../Componentes/Info_Producto_Vendedor";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;


const Productos_Vendedor = () => {

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

                <View>
                    <Info_Producto_Vendedor/>
                </View>
                
            </ScrollView>

            <Menu/>
            
        </SafeAreaView>
    )
}

export default Productos_Vendedor