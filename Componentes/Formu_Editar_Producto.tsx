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
    imagen: string;
    setImagen: (value: string) => void;
    titulo: string;
    setTitulo: (value: string) => void;
    descripcion: string;
    setDescripcion: (value: string) => void;
    precio: string;
    setPrecio: (value: string) => void;
    categorias: Categoria[];
    categoria_seleccionada: number;
    setCategoria_seleccionada: (value: number) => void;
    Editar_Producto: () => void;
    Cancelar: () => void;
};

type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}

const Formu_Editar_Producto: React.FC<Props> = ({ imagen, setImagen, titulo, setTitulo, descripcion, setDescripcion, precio, setPrecio, categorias, categoria_seleccionada, setCategoria_seleccionada, Editar_Producto, Cancelar }) => {

    const navigation = useNavigation<navigationProp>()

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
                    onChangeText={setDescripcion}
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