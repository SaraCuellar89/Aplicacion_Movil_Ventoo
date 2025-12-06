import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Pantallas/css/Estilos_Principal';
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Formu_Registro_Productos from "../Componentes/Formu_Registro_Productos";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Registro_Productos = () => {

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

                <View style={estilos.caja_inicio_sesion}>

                    <Formu_Registro_Productos/>

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Registro_Productos