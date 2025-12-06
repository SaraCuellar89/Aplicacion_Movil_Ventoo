import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import estilos from '../Pantallas/css/Estilos_Principal';
import Menu from "../Componentes/Menu";
import Formu_Registro from "../Componentes/Formu_Registro";

const Registro = () => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <Encabezado/>

                <View style={estilos.caja_inicio_sesion}>

                    <Formu_Registro/>

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Registro