import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import estilos from '../Pantallas/css/Estilos_Principal';
import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import Info_Producto from "../Componentes/Info_Producto";
import Formu_Resenas from "../Componentes/Formu_Resenas";
import Tarjeta_Producto from "../Componentes/Tarjeta_Producto";
import Tarjeta_Resena from "../Componentes/Tarjeta_Resena";

type navigationProp = NativeStackNavigationProp<RootStackParamList, "Principal">;
type VerProductoRouteProp = RouteProp<RootStackParamList, 'Ver_Producto'>;


type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};



type Resena = {
    Id_resena: number;
    NombreUsuario: string;
    Estrellas: number;
    Comentario: string;
};



const Ver_Producto = () => {

    const navigation = useNavigation<navigationProp>();

    const route = useRoute<VerProductoRouteProp>();
    const { id_producto } = route.params;


    //Obtener productos del vendedor
    const [productos_vendedor, setProducos_vendedor] = useState<Producto[]>([]);

    useEffect(() => {
        const Obtener_Productos_Vendedor = async () => {
            try{
                const res = await fetch(`https://backend-ventoo.vercel.app/producto/${id_producto}`)
                const datos = await res.json()

                setProducos_vendedor(datos.masDelVendedor)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos_Vendedor()
    }, [id_producto])



    //Obtener reseñas
    const [resenas, setResenas] = useState<Resena[]>([])
    
    useEffect(() => {
        const Obtener_Resenas = async () => {
            try{
                const res = await fetch(`https://backend-ventoo.vercel.app/resenas/${id_producto}`)
                const datos = await res.json()

                setResenas(datos.resenas)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Resenas()
    }, [id_producto])


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <View>
                    <Encabezado/>

                    <TouchableOpacity style={estilos.btn_ver} onPress={() => navigation.goBack()}>
                        <Text style={estilos.texto_btn_ver}>{'<<'} Regresar</Text>
                    </TouchableOpacity>

                    <Info_Producto
                        id_producto={id_producto}
                    />

                    <Text style={estilos.texto_ver_producto}>Mas del vendedor</Text>

                    <View style={estilos.contenedor_tarjetas_inicio}>
                        <ScrollView
                            style={estilos.caja_tarjetas_inicio}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}    
                            nestedScrollEnabled={true}
                        >
                            {productos_vendedor.length === 0 ?
                            (
                                <Text>No hay producto</Text>
                            ) : 
                            (
                                <>
                                {productos_vendedor.map((p) => (
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

                    <Text style={estilos.texto_ver_producto}>Opiniones</Text>

                    <View style={estilos.caja_ver_productos}>

                        <Formu_Resenas/>

                        <View style={estilos.opinion_ver_productos}>
                            <Text style={estilos.puntuacion_ver_productos}>5.0</Text>
                            <Text style={estilos.estrellas_ver_productos}>★★★★★</Text>
                        </View>

                        <View style={estilos.caja_resenas_ver_productos}>
                            {resenas.length === 0 ?
                            (
                                <Text>No hay reseñas</Text>
                            ) : 
                            (
                                <>
                                    {resenas.map((r) => (
                                        <Tarjeta_Resena
                                            key={r.Id_resena}
                                            id_resena={r.Id_resena}
                                            nombre_usuario={r.NombreUsuario}
                                            estrellas={r.Estrellas}
                                            comentario={r.Comentario}
                                        />
                                    ))}
                                </>
                            )}
                        </View>

                    </View>
                    
                </View>
                
            </ScrollView>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Ver_Producto