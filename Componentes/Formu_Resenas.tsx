import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'

const Formu_Resenas = () => {
    return(
        <View style={estilos.contendor_formu_resena}>
            <TextInput placeholder="Escribe una reseña" placeholderTextColor="#153B40" style={estilos.input_formu_resena}/>

            <View style={estilos.caja_estrellas_formu_resena}>
                <Picker style={estilos.estrellas_formu_resena}>
                    <Picker.Item label="1 Estrella" value="1"/>
                    <Picker.Item label="2 Estrella" value="2"/>
                    <Picker.Item label="3 Estrella" value="3"/>
                    <Picker.Item label="4 Estrella" value="4"/>
                    <Picker.Item label="5 Estrella" value="5"/>
                </Picker>
            </View>

            <TouchableOpacity style={estilos.btn_subir_formu_resena}>
                <Text style={estilos.texto_btn_subir_formu_resena}>Subir</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Formu_Resenas