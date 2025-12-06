import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import estilos from '../Componentes/css/Estilos_Modal'
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;



// Definimos las props que recibirá el componente
type ModalPagoProps = {
    visible: boolean;
    setVisible: (value: boolean) => void;
    total: number;
    productos: Producto[];
}



type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
    Cantidad: number;
};

const Modal_Pago: React.FC<ModalPagoProps> = ({ visible, setVisible, total, productos }) => {

    const navigation = useNavigation<navigationProp>();


    // ============ Realizar Pedido ============

    const [metodoPago, setMetodo_Pago] = useState('')
    const [direccion, setDireccion] = useState('')


    const Pagar_Pedido = async () => {

        if (!direccion.trim()) {
            return Alert.alert("Ingresa una dirección válida");
        }

        if (!metodoPago) {
            return Alert.alert("Selecciona un método de pago");
        }

        Alert.alert(
            "Finalizar Pedido",
            "¿Quieres finalizar tu pedido?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: async () => {
                        const token = await AsyncStorage.getItem("token");

                        try{
                            const res = await fetch('https://backend-ventoo.vercel.app/crear_pedido', {
                                method: "POST",
                                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                                body: JSON.stringify({direccion, metodoPago, total, productos})
                            })

                            const datos = await res.json()

                            if(!datos.success){
                                return Alert.alert('No se pudo realizar el pedido')
                            }

                            Alert.alert('¡Pedido Completado!')
                            navigation.navigate('Pedidos')
                        }
                        catch(error){
                            console.log('Error: ' + error)
                        }
                    }
                }
            ]
        )
    }


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
