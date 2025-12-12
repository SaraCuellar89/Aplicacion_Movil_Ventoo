import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import estilos from '../Pantallas/css/Estilos_Principal';
import Info_Producto from "../Componentes/Info_Producto";
import Formu_Resenas from "../Componentes/Formu_Resenas";
import Tarjeta_Producto from "../Componentes/Tarjeta_Producto";
import Tarjeta_Resena from "../Componentes/Tarjeta_Resena";
import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    Id_usuario: number;
};

type Usuario = {
    Id_usuario: number;
    Nombre: string;
    Email: string;
    Rol: string;
}



const Ver_Producto = () => {

    const navigation = useNavigation<navigationProp>();

    const route = useRoute<VerProductoRouteProp>();
    const { id_producto } = route.params;


    // ============ Obtener Productos del vendedor ============
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



    // ============ Obtener Reseñas ============
    const [resenas, setResenas] = useState<Resena[]>([])
    
    useEffect(() => {
        const Obtener_Resenas = async () => {
            try{
                const res = await fetch(`https://backend-ventoo.vercel.app/resenas/${id_producto}`)
                const datos = await res.json()

                console.log(datos)
                setResenas(datos.resenas)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Resenas()
    }, [id_producto])



    // ============ Promedio de estrellas ============
    const promedioNum =
        resenas.length > 0
            ? resenas.reduce((acc, r) => acc + r.Estrellas, 0) / resenas.length
            : 0;

    const promedio = promedioNum.toFixed(1); // string para mostrar
    const estrellasVisuales =
        "★".repeat(Math.round(promedioNum)) +
        "☆".repeat(5 - Math.round(promedioNum));



    // ============ Funcion para aumentar o disminuir la cantidad de un producto ============
    const [cantidad, setCantidad] = useState(0)

    const Aumentar = () => {
        if(cantidad === 20){
            setCantidad(20)
        }
        else{
            setCantidad(cantidad + 1)
        }
    }

    const Disminuir = () => {
        if(cantidad === 1){
            setCantidad(1)
        }
        else{
            setCantidad(cantidad - 1)
        }
    }



    // ============ Obtener la informacion detallada de un producto ============
    const [info_Producto, setInfo_producto] = useState<Info_Producto | null>(null);

    useEffect(() => {
        const Obtener_Info_Producto = async () => {
            try{
                const res = await fetch(`https://backend-ventoo.vercel.app/producto/${id_producto}`)
                const datos = await res.json()
                
                setInfo_producto(datos.producto)
                setCantidad(1)
            }  
            catch(error){
                console.log('Error: ' + error)
            }
        }
        Obtener_Info_Producto()
    }, [id_producto])




    // ============ funcion para agregar productos al carrito ============
    const Agregar_Carrito = async () => {

        const token = await AsyncStorage.getItem("token");

        try{
            const res = await fetch('https://backend-ventoo.vercel.app/carrito/agregar', {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({Id_producto:id_producto, Cantidad:cantidad})
            })

            const datos = await res.json()

            if(!datos.success){
                return Alert.alert('No se pudo agregar el producto al carrito')
            }

            Alert.alert('¡Producto agregado a tu carrito!')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    // ============ Funcion para Subir una reseña ============
    const [comentario, setComentario] = useState('')
    const [estrellas, setEstrellas] = useState(1)

    const Subir_Resena = async () => {

        if(comentario.trim().length < 10){
            return Alert.alert('El comentario debe ser mayor a 10 reseñas')
        }

        const token = await AsyncStorage.getItem("token");

        try{
            const res = await fetch('https://backend-ventoo.vercel.app/resena', {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({Id_producto: id_producto, Comentario: comentario, Estrellas: estrellas})
            })

            const datos = await res.json()

            if(!datos.success){
                return Alert.alert('No se pudo subir la reseña')
            }

            Alert.alert('¡Reseña Subida!')
            navigation.replace("Ver_Producto", { id_producto });
        }
        catch(error){
            console.error('Error: ' + error)
        }
    }


    // ============ Obtener el id del usuario en sesion ============
    const [id_usuario_logueado , setId_usuario_logueado ] = useState<number | null>(null)
    const [info_usuario, setInfo_usuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const Obtener_Info_Usuario = async () => {

            const token = await AsyncStorage.getItem("token");

            try {
                const res = await fetch('https://backend-ventoo.vercel.app/usuario_logueado', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const datos = await res.json();

                if (datos.success) {
                    setId_usuario_logueado(datos.usuario.Id_usuario);
                    setInfo_usuario(datos.usuario)
                } else {
                    setId_usuario_logueado(null);
                }

            } catch (error) {
                console.error('Error: ' + error);
            }
        };

        Obtener_Info_Usuario();
    }, []);




    // ============ Funcion Para editar una reseña ============
    const Editar_Resena = async (id_resena: number, comentario: string, estrellas: number) => {
        
        if(comentario.trim().length < 10){
            return Alert.alert('El comentario debe ser mayor a 10 reseñas')
        }

        const token = await AsyncStorage.getItem("token");

        try {
            const res = await fetch(`https://backend-ventoo.vercel.app/resena/${id_resena}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token 
                },
                body: JSON.stringify({
                    Comentario: comentario,  // <-- usar el parámetro
                    Estrellas: estrellas     // <-- usar el parámetro
                })
            });

            const datos = await res.json();

            if(!datos.success){
                return Alert.alert("No se pudo editar la reseña");
            }

            // Actualizamos el estado local
            setResenas(prev => prev.map(r =>
                r.Id_resena === id_resena
                    ? { ...r, Comentario: comentario, Estrellas: estrellas }
                    : r
            ));

            Alert.alert("¡Reseña Editada!");
            navigation.replace("Ver_Producto", { id_producto });
        }
        catch (error) {
            console.log('Error: ' + error)
        }
    }



    // ============ Funcion para eliminar una reseña ============
    const Eliminar_Resena = async (id_resena: number) => {
        Alert.alert(
            "Eliminar Reseña",
            "¿Quieres eliminar esta reseña?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: async () => {
                        const token = await AsyncStorage.getItem("token");

                        try{
                            const res = await fetch(`https://backend-ventoo.vercel.app/resena/${id_resena}`, {
                                method: "DELETE",
                                headers: { 
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + token 
                                }
                            });

                            const datos = await res.json()

                            if(!datos.success){
                                return Alert.alert('No se pudo eliminar la reseña')
                            }

                            // Filtramos la reseña eliminada del estado
                            setResenas(prev => prev.filter(r => r.Id_resena !== id_resena));

                            Alert.alert('Reseña Eliminada')
                        }
                        catch(error){
                            console.log('Error: ' + error)
                        }
                    }
                }
            ]
        )
    }


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
                        info_Producto={info_Producto}
                        cantidad={cantidad}
                        Disminuir={Disminuir}
                        Aumentar={Aumentar}
                        Agregar_Carrito={Agregar_Carrito}
                        info_usuario={info_usuario}
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

                        {info_usuario ?
                        (
                            <>
                                {info_usuario.Rol === 'Cliente' ? 
                                (
                                    <Formu_Resenas
                                        estrellas={estrellas}
                                        setEstrellas={setEstrellas}
                                        comentario={comentario}
                                        setComentario={setComentario}
                                        Subir_Resena={Subir_Resena}
                                    />
                                ) : 
                                (
                                    null
                                )}
                            </>
                        ) :
                        (
                            null
                        )}

                        <View style={estilos.opinion_ver_productos}>
                            <Text style={estilos.puntuacion_ver_productos}>{promedio}</Text>
                            <Text style={estilos.estrellas_ver_productos}>{estrellasVisuales}</Text>
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
                                            id_usuario_resena={r.Id_usuario}
                                            id_usuario_logueado={id_usuario_logueado ?? 0}
                                            Editar_Resena={Editar_Resena}
                                            Eliminar_Resena={Eliminar_Resena}
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