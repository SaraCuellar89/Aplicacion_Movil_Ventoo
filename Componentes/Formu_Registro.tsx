import React, { useState } from "react";
import estilos from '../Componentes/css/Estilos_Formularios'
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Formu_Registro = () => {

    const navigation = useNavigation<navigationProp>();

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("Cliente");
    const [contrasena, setContrasena] = useState("");

    const Registrarse = async () => {

        const emailRegex = /^[^@\s]+@[^@\s]+\.(com)$/;

        if(nombre.length <= 10){
            return Alert.alert('El nombre debe tener al menos 10 caracteres')
        }
        else if(telefono.length !== 10){
            return Alert.alert('El teléfono debe ser igual a 10 digitos')
        }
        else if (isNaN(Number(telefono))) {
            return Alert.alert('El teléfono debe contener solo números');
        }
        if (!emailRegex.test(correo)) {
            return Alert.alert("El correo no es valido");
        }
        if(contrasena.length < 5){
            return Alert.alert("La contraseña debe tener mas de 5 caracteres");
        }

        try{
            const res = await fetch('https://backend-ventoo.vercel.app/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre, email:correo, telefono, contrasena, rol})
            })

            const datos = await res.json()

            if(!datos.success){
                return Alert.alert('No se pudo completar el registro')
            }

            Alert.alert('¡Registro Exitoso!')
            navigation.navigate('Inicio_Sesion')
        }
        catch(error){
            console.error('Error: ' + error)
        }
    }

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