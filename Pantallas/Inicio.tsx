import React, { useEffect, useState } from "react";
import { Text, Image, View, ScrollView, TouchableOpacity } from "react-native";
import estilos from '../Pantallas/css/Estilos_Principal';
import Encabezado from "../Componentes/Encabezado";
import { SafeAreaView } from "react-native-safe-area-context";
import Carrusel from "../Componentes/Carrusel";
import Tarjeta_Inicio from "../Componentes/Tarjeta_Inicio";
import Tarjeta_Producto from "../Componentes/Tarjeta_Producto";
import Menu from "../Componentes/Menu";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;

type TarjetaData = {
    id: number;
    texto: string;
    imagen: any;
    ruta: keyof RootStackParamList;
};

type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};

const tarjetasData: TarjetaData[] = [
    {
        id: 1,
        texto: "Entra a tu cuenta",
        imagen: require('../img/perfil-del-usuario.png'),
        ruta: 'Inicio_Sesion'
    },
    {
        id: 2,
        texto: "Compra algo",
        imagen: require('../img/anadir-a-la-cesta.png'),
        ruta: 'Compra'
    },
    {
        id: 3,
        texto: "Vende tu mismo",
        imagen: require('../img/no-se-vende.png'),
        ruta: 'Inicio_Sesion'
    }
];

const Inicio = () => {

    const navigation = useNavigation<navigationProp>();

    const [productos, setProductos] = useState<Producto[]>([]);

    //Obtener 3 productos aleatoriamente
    useEffect(() => {
        const Obtener_Productos = async () => {
            try{
                const res = await fetch('https://backend-ventoo.vercel.app/productos')
                const datos = await res.json()

                // Mezclar productos aleatoriamente
                const productosAleatorios = datos.productos
                .sort(() => 0.5 - Math.random())  // mezcla
                .slice(0, 3); 

                setProductos(productosAleatorios)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40'}}>
            
            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279' }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <View style={estilos.contenedor_inicio}>
                    <Encabezado/>

                    <Carrusel/>

                    <View style={estilos.contenedor_tarjetas_inicio}>
                        <ScrollView
                            style={estilos.caja_tarjetas_inicio}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}    
                            nestedScrollEnabled={true} 
                            
                        >
                            {tarjetasData.map((tarjeta) => (
                                <Tarjeta_Inicio
                                    key={tarjeta.id}
                                    texto={tarjeta.texto}
                                    imagen={tarjeta.imagen}
                                    ruta={tarjeta.ruta}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <TouchableOpacity style={estilos.btn_ver} onPress={() => navigation.navigate('Compra')}>
                        <Text style={estilos.texto_btn_ver}>Ver mas {'>>'}</Text>
                    </TouchableOpacity>

                    <View style={estilos.contenedor_tarjetas_inicio}>
                        <ScrollView
                            style={estilos.caja_tarjetas_inicio}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}    
                            nestedScrollEnabled={true}
                        >
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
                        </ScrollView>
                    </View>

                </View>
                
            </ScrollView>

            <Menu/>

        </SafeAreaView>
    )
}

export default Inicio