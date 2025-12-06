import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Formu_Inicio_Sesion from "../Componentes/Formu_Inicio_Sesion";
import estilos from '../Pantallas/css/Estilos_Principal';

const Inicio_Sesion = () => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <Encabezado/>

                <View style={estilos.caja_inicio_sesion}>

                    <Formu_Inicio_Sesion/>

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Inicio_Sesion