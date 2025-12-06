import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import estilos from '../Componentes/css/Estilos_Modal'
import { Picker } from "@react-native-picker/picker";

// Definimos las props que recibirá el componente
type ModalPagoProps = {
    visible: boolean;
    setVisible: (value: boolean) => void;
}

const Modal_Pago: React.FC<ModalPagoProps> = ({ visible, setVisible }) => {

    return (
        <Modal
            visible={visible}
            transparent={true}     // Para fondo semitransparente
            animationType="fade"   // fade | slide | none
        >
            <ScrollView
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
                contentContainerStyle={estilos.contenedor_modal}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >
                <View style={estilos.contenedor_modal}>
                    <View style={estilos.caja_modal}>
                        
                        <View style={estilos.caja_info_modal}>
                            <Text style={estilos.titulo_info_modal}>Total a Pagar:</Text>
                            <Text style={estilos.texto_info_modal}>$10.000</Text>
                        </View>

                        <View style={estilos.caja_info_modal}>
                            <Text style={estilos.titulo_info_modal}>Metodo de Pago</Text>
                            <View style={estilos.caja_opciones_info_modal}>
                                <Picker style={estilos.opciones_info_modal}>
                                    <Picker.Item label="PSE" value=""/>
                                    <Picker.Item label="Tarjeta De Credito" value=""/>
                                </Picker>
                            </View>
                        </View>

                        <View style={estilos.caja_info_modal}>
                            <TouchableOpacity style={estilos.btn_comprar_modal}>
                                <Text style={estilos.texto_btn_comprar_modal}>Finalizar Compra</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={estilos.btn_cancelar_modal} onPress={() => setVisible(false)}>
                                <Text style={estilos.texto_btn_cancelar_modal}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
        </Modal>
    );
};

export default Modal_Pago
