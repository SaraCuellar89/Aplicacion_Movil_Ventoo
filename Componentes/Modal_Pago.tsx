import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import estilos from '../Componentes/css/Estilos_Modal'
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type ModalPagoProps = {
    visible: boolean;
    setVisible: (value: boolean) => void;
    total: number;
    direccion: string;
    setDireccion: (valor: string) => void;
    metodoPago: string;
    setMetodo_Pago: (valor: string) => void;
    Pagar_Pedido: () => void;
}

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
    Cantidad: number;
};

const Modal_Pago: React.FC<ModalPagoProps> = ({ visible, setVisible, total, direccion, setDireccion, metodoPago, setMetodo_Pago, Pagar_Pedido}) => {

    const navigation = useNavigation<navigationProp>();

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
                            <Text style={estilos.texto_info_modal}>${total}</Text>
                        </View>

                        <View style={estilos.caja_info_modal}>
                            <Text style={estilos.titulo_info_modal}>Dirección</Text>
                            <TextInput style={estilos.input_modal_pago} value={direccion} onChangeText={setDireccion}/>
                        </View>

                        <View style={estilos.caja_info_modal}>
                            <Text style={estilos.titulo_info_modal}>Metodo de Pago</Text>
                            <View style={estilos.caja_opciones_info_modal}>
                                <Picker 
                                    style={estilos.opciones_info_modal}
                                    selectedValue={metodoPago}
                                    onValueChange={(itemValue) => setMetodo_Pago(itemValue)}
                                >
                                    <Picker.Item label="Nequi" value="Nequi"/>
                                    <Picker.Item label="DaviPlata" value="DaviPlata"/>
                                    <Picker.Item label="Tarjeta De Credito" value="Tarjeta De Credito"/>
                                </Picker>
                            </View>
                        </View>

                        <View style={estilos.caja_info_modal}>
                            <TouchableOpacity style={estilos.btn_comprar_modal} onPress={Pagar_Pedido}>
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
