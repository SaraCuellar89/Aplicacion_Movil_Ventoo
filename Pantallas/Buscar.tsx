import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Buscador from "../Componentes/Buscador";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos from '../Pantallas/css/Estilos_Principal';
import Tarjeta_Producto from "../Componentes/Tarjeta_Producto";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};

const Buscar = () => {

    const [productos, setProductos] = useState<Producto[]>([]);

    const navigation = useNavigation<navigationProp>();

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <View style={estilos.contenedor_buscar}>
                    <Encabezado/>

                    <TouchableOpacity style={estilos.btn_ver} onPress={() => navigation.goBack()}>
                        <Text style={estilos.texto_btn_ver}>{'<<'} Regresar</Text>
                    </TouchableOpacity>

                    <Buscador
                        productos={(productos) => setProductos(productos)}
                    />

                    <View style={estilos.caja_tarjetas_productos_buscar}>
                        {productos.length === 0 ? 
                        (
                            <Text>No hay productos</Text>
                        ) : 
                        (
                            <>
                                {productos.map((p) => (
                                    <Tarjeta_Producto
                                        key={p.Id_producto}   
                                        id_producto={p.Id_producto}
                                        nombre={p.Nombre}
                                        precio={p.Precio}
                                        imagen={p.Imagen}
                                    />
                                ))}
                            </>
                        )}
                    </View>

                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Buscar