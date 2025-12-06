import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Formularios'
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;


type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}


const Formu_Registro_Productos = () => {

    const navigation = useNavigation<navigationProp>();


    const [categorias, setCategorias] = useState<Categoria[]>([])

    //Obtener categorias
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
    const [descripcion, setDescirpcion] = useState('')
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
        <View style={estilos.contenedor_formu_inicio_sesion}>

            <Text style={estilos.titulo_formu_inicio_sesion}>Registrar</Text>

            <Image
                source={{ uri: imagen }}
                resizeMode="contain"
                style={estilos.img_formu_registro_productos}
            />
            
            <View style={estilos.caja_inputs_formu_inicio_sesion}>
                <TextInput 
                    placeholder="Titulo" 
                    placeholderTextColor="#153B40" 
                    style={estilos.inputs_formu_inicio_sesion}
                    value={titulo} 
                    onChangeText={setTitulo}
                />

                <TextInput 
                    placeholder="Descripcion" 
                    placeholderTextColor="#153B40" 
                    style={estilos.inputs_formu_inicio_sesion}
                    value={descripcion} 
                    onChangeText={setDescirpcion}
                />

                <TextInput 
                    placeholder="Precio" 
                    placeholderTextColor="#153B40" 
                    style={estilos.inputs_formu_inicio_sesion}
                    value={precio} 
                    onChangeText={setPrecio}
                />

                <TextInput 
                    placeholder="Imagen URL" 
                    placeholderTextColor="#153B40" 
                    style={estilos.inputs_formu_inicio_sesion} 
                    value={imagen} 
                    onChangeText={setImagen}
                />

                <View style={estilos.caja_rol_registro}>
                    <Picker 
                        style={estilos.rol_registro}
                        selectedValue={categoria_seleccionada}
                    onValueChange={(id_categoria) => setCategoria_seleccionada(id_categoria)}
                    >
                        <Picker.Item label="Categoria" value={null}/>
                        {categorias.map(c => (
                            <Picker.Item 
                                key={c.Id_categoria} 
                                label={c.Nombre_categoria} 
                                value={c.Id_categoria}
                            />
                        ))}
                        
                    </Picker>
                </View>
            </View>


            

            <View style={estilos.caja_btns_formu_inicio_sesion}>
                <TouchableOpacity style={estilos.btn_entrar_formu_inicio_sesion} onPress={Registrar_Productos}>
                    <Text style={estilos.texto_btn_entrar_formu_inicio_sesion}>Registrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Formu_Registro_Productos