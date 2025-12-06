import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Formularios'
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Props = {
    id_producto: number;
};

type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}

const Formu_Editar_Producto: React.FC<Props> = ({ id_producto })=> {

    const navigation = useNavigation<navigationProp>();


    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescirpcion] = useState('')
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

                console.log(datos)

                setTitulo(datos.producto.Nombre)
                setDescirpcion(datos.producto.Descripcion)
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


    //Cancelar Edicion
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
        <View style={estilos.contenedor_formu_inicio_sesion}>

            <Text style={estilos.titulo_formu_inicio_sesion}>Editar</Text>

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
                        onValueChange={(valor) => setCategoria_seleccionada(Number(valor))}
                    >
                        <Picker.Item label="Categoria" value={0}/>
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
                <TouchableOpacity style={estilos.btn_editar_formu_editar_producto} onPress={Editar_Producto}>
                    <Text style={estilos.texto_btn_editar_formu_editar_producto}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.btn_entrar_formu_inicio_sesion} onPress={Cancelar}>
                    <Text style={estilos.texto_btn_entrar_formu_inicio_sesion}>Cancelar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Formu_Editar_Producto