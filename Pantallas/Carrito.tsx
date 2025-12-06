import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import estilos from '../Pantallas/css/Estilos_Principal';
import Info_Carrito from "../Componentes/Info_Carrito";
import Modal_Pago from "../Componentes/Modal_Pago";

const Carrito = () => {

    //Estado del modal
    const [visible, setVisible] = useState(false);

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <Encabezado/>

                <Info_Carrito
                    setVisible={setVisible}
                />

                <Modal_Pago
                    visible={visible}
                    setVisible={setVisible}
                />
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Carrito