import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Pantallas/css/Estilos_Principal';
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Formu_Registro_Productos from "../Componentes/Formu_Registro_Productos";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}

const Registro_Productos = () => {

    const navigation = useNavigation<navigationProp>();


    const [categorias, setCategorias] = useState<Categoria[]>([])

    // ============ Obtener todas las categorias ============
    useEffect(() => {
        const Obtener_Categorias = async () => {
            try{
                const res = await fetch('https://backend-ventoo.vercel.app/categorias')
                const datos = await res.json()

                setCategorias(datos.categorias)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }
        Obtener_Categorias()
    }, [])


    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [imagen, setImagen] = useState('https://i.pinimg.com/736x/a8/a5/75/a8a575ec422381fcb905a327aecf379b.jpg')
    const [categoria_seleccionada, setCategoria_seleccionada] = useState<number | null>(null)


    // ============ Funcion para registrar productos ============
    const Registrar_Productos = async () => {

        const token = await AsyncStorage.getItem("token");

        if(titulo.length < 6){
            return Alert.alert('El titulo debe tener mas de 5 caracteres')
        }
        else if(descripcion.length < 10){
            return Alert.alert('La descripcion debe tener mas de 10 caracteres')
        }
        else if(isNaN(Number(precio))){
            return Alert.alert('El precio debe contener solo números');
        }
        else if(precio.length < 3){
            return Alert.alert('El precio debe tener 3 o mas digitos')
        }
        else if(categoria_seleccionada === null){
            return Alert.alert('Escoje una categoria valida')
        }

        try{
            const res = await fetch('https://backend-ventoo.vercel.app/registrar_producto', {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({titulo, descripcion, precio, imagen, categoria: categoria_seleccionada})
            })

            const datos = await res.json()

            if(!datos.success){
                return Alert.alert('No se pudo completar el registro')
            }

            Alert.alert('¡Producto creado!')
            navigation.navigate('Productos_Vendedor')
        }
        catch(error){
            console.log('Error: ' + error)
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

                <TouchableOpacity style={estilos.btn_ver} onPress={() => navigation.goBack()}>
                    <Text style={estilos.texto_btn_ver}>{'<<'} Regresar</Text>
                </TouchableOpacity>

                <View style={estilos.caja_inicio_sesion}>

                    <Formu_Registro_Productos
                        imagen={imagen}
                        setImagen={setImagen}
                        titulo={titulo}
                        setTitulo={setTitulo}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                        precio={precio}
                        setPrecio={setPrecio}
                        categoria_seleccionada={categoria_seleccionada}
                        setCategoria_seleccionada={setCategoria_seleccionada}
                        categorias={categorias}
                        Registrar_Productos={Registrar_Productos}
                    />

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Registro_Productos