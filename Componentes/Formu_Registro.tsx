import React, { useState } from "react";
import estilos from '../Componentes/css/Estilos_Formularios'
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Props = {
    nombre: string;
    setNombre: (value: string) => void;
    telefono: string;
    setTelefono: (value: string) => void;
    correo: string;
    setCorreo: (value: string) => void;
    rol: string;
    setRol: (value: string) => void;
    contrasena: string;
    setContrasena: (value: string) => void;
    Registrarse: () => void;
};

const Formu_Registro: React.FC<Props> = ({ nombre, setNombre, telefono, setTelefono, correo, setCorreo, rol, setRol, contrasena, setContrasena, Registrarse }) => {

    const navigation = useNavigation<navigationProp>();

    return(
        <View style={estilos.contenedor_formu_inicio_sesion}>    

            <Text style={estilos.titulo_formu_inicio_sesion}>Registro</Text>

            <View style={estilos.caja_inputs_formu_inicio_sesion}>

                <TextInput
                    placeholder="Nombre"
                    placeholderTextColor="#153B40"
                    style={estilos.inputs_formu_inicio_sesion}
                    value={nombre}
                    onChangeText={setNombre}
                />

                <TextInput
                    placeholder="Telefono"
                    placeholderTextColor="#153B40"
                    style={estilos.inputs_formu_inicio_sesion}
                    value={telefono}
                    onChangeText={setTelefono}
                />

                <TextInput
                    placeholder="Correo"
                    placeholderTextColor="#153B40"
                    style={estilos.inputs_formu_inicio_sesion}
                    value={correo}
                    onChangeText={setCorreo}
                />

                <View style={estilos.caja_rol_registro}>
                    <Picker
                        selectedValue={rol}
                        onValueChange={setRol}
                        style={estilos.rol_registro}
                    >
                        <Picker.Item label="Cliente" value="Cliente"/>
                        <Picker.Item label="Vendedor" value="Vendedor"/>
                    </Picker>
                </View>

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
                <TouchableOpacity style={estilos.btn_entrar_formu_inicio_sesion} onPress={Registrarse}>
                    <Text style={estilos.texto_btn_entrar_formu_inicio_sesion}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Inicio_Sesion')}>
                    <Text style={estilos.texto_link_formu_inicio_sesion}>Ya tengo una cuenta</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Formu_Registro