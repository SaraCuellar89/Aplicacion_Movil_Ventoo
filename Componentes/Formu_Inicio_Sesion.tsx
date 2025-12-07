import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Formularios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Props = {
    correo: string;
    setCorreo: (valor: string) => void;
    contrasena: string;
    setContrasena: (valor: string) => void;
    Iniciar_Sesion: () => void;
}

const Formu_Inicio_Sesion: React.FC<Props> = ({ correo, setCorreo, contrasena, setContrasena, Iniciar_Sesion }) => {

    const navigation = useNavigation<navigationProp>();

    return(
        <View style={estilos.contenedor_formu_inicio_sesion}>

            <Text style={estilos.titulo_formu_inicio_sesion}>Inicio de Sesión</Text>
            
            <View style={estilos.caja_inputs_formu_inicio_sesion}>
                <TextInput
                    placeholder="Correo" 
                    placeholderTextColor="#153B40" 
                    style={estilos.inputs_formu_inicio_sesion}
                    value={correo}
                    onChangeText={setCorreo}
                />

                <TextInput 
                    placeholder="Contraseña" 
                    placeholderTextColor="#153B40" 
                    secureTextEntry={true} 
                    style={estilos.inputs_formu_inicio_sesion}
                    value={contrasena}
                    onChangeText={setContrasena}
                />
            </View>

            <View style={estilos.caja_btns_formu_inicio_sesion}>
                <TouchableOpacity style={estilos.btn_entrar_formu_inicio_sesion} onPress={Iniciar_Sesion}>
                    <Text style={estilos.texto_btn_entrar_formu_inicio_sesion}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={estilos.texto_link_formu_inicio_sesion}>No tengo una cuenta</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Formu_Inicio_Sesion