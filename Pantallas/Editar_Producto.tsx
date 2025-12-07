import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Pantallas/css/Estilos_Principal';
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Formu_Editar_Producto from "../Componentes/Formu_Editar_Producto";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;
type VerProductoRouteProp = RouteProp<RootStackParamList, 'Editar_Producto'>;


type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}


const Editar_Producto = () => {

    const navigation = useNavigation<navigationProp>();

    const route = useRoute<VerProductoRouteProp>();
    const { id_producto } = route.params;


    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [imagen, setImagen] = useState('https://i.pinimg.com/736x/a8/a5/75/a8a575ec422381fcb905a327aecf379b.jpg')
    const [categoria_seleccionada, setCategoria_seleccionada] = useState<number>(0);



    useEffect(() => {

        // ============ Obtener categorias apenas cargue la pagina  ============
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


        // ============ Obtener datos del producto apenas cargue la pagina ============
        const Obtener_Info_Producto = async () => {

            const token = await AsyncStorage.getItem("token");

            try{
                const res = await fetch(`https://backend-ventoo.vercel.app/producto_id/${id_producto}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    }
                })
                const datos = await res.json()

                setTitulo(datos.producto.Nombre)
                setDescripcion(datos.producto.Descripcion)
                setPrecio(datos.producto.Precio)
                setImagen(datos.producto.Imagen)
                setCategoria_seleccionada(datos.producto.Id_categoria)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Info_Producto()
    }, [])




    // ============ Funcion para registrar productos ============
    const Editar_Producto = async () => {

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
        else if(categoria_seleccionada === 0){
            return Alert.alert('Escoje una categoria valida')
        }

        try{
            const res = await fetch(`https://backend-ventoo.vercel.app/editar_producto/${id_producto}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({titulo, descripcion, precio, imagen, categoria: categoria_seleccionada})
            })

            const datos = await res.json()

            if(!datos.success){
                return Alert.alert('No se pudo editar el producto')
            }

            Alert.alert('¡Producto Editado!')
            navigation.navigate('Productos_Vendedor')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    // ============ funcion para cancelar Edicion ============
    const Cancelar = () => {
        Alert.alert(
            "Borrar Cambios",
            "Quieres salir borrar los cambios?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        navigation.goBack()
                    }
                }
            ]
        );
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

                    <Formu_Editar_Producto
                        imagen={imagen}
                        setImagen={setImagen}
                        titulo={titulo}
                        setTitulo={setTitulo}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                        precio={precio}
                        setPrecio={setPrecio}
                        categorias={categorias}
                        categoria_seleccionada={categoria_seleccionada}
                        setCategoria_seleccionada={setCategoria_seleccionada}
                        Editar_Producto={Editar_Producto}
                        Cancelar={Cancelar}
                    />

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Editar_Producto