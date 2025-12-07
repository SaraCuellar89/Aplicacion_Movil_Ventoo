import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import estilos from '../Pantallas/css/Estilos_Principal';
import Menu from "../Componentes/Menu";
import Formu_Registro from "../Componentes/Formu_Registro";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

const Registro = () => {

    const navigation = useNavigation<navigationProp>();

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("Cliente");
    const [contrasena, setContrasena] = useState("");


    // ============ Funcion para registrar un usuario ============
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <Encabezado/>

                <View style={estilos.caja_inicio_sesion}>

                    <Formu_Registro
                        nombre={nombre}
                        setNombre={setNombre}
                        telefono={telefono}
                        setTelefono={setTelefono}
                        correo={correo}
                        setCorreo={setCorreo}
                        rol={rol}
                        setRol={setRol}
                        contrasena={contrasena}
                        setContrasena={setContrasena}
                        Registrarse={Registrarse}
                    />

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Registro