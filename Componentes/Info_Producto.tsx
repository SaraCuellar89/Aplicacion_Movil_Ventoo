import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    id_producto: number;
};

type Info_Producto = {
    Nombre: string;
    Imagen: string;
    Descripcion: string;
    Precio: number;
};

const Info_Producto: React.FC<Props> = ({ id_producto }) => {


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





    const [info_Producto, setInfo_producto] = useState<Info_Producto | null>(null);

    //Obtener informacion del producto
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
    

    return(
        <View style={estilos.contenedor_info_producto}>

            {info_Producto === null ? 
            (
                <Text>Cargando...</Text>
            ) : 
            (
                <>
                    <View style={estilos.caja_info_producto}>
                
                        <Text style={estilos.titulo_info_producto}>{info_Producto.Nombre}</Text>

                        <Image
                            source={{ uri: info_Producto.Imagen }}
                            resizeMode="contain"
                            style={estilos.img_info_producto}
                        />

                        <Text style={estilos.descripcion_info_producto}>{info_Producto.Descripcion}</Text>

                        <Text style={estilos.precio_info_producto}>${info_Producto.Precio}</Text>

                        {/* <Text style={estilos.cantidad_info_producto}>Cantidad: 10</Text> */}

                        <View style={estilos.caja_cantidad_info_producto}>

                            <TouchableOpacity onPress={Disminuir} style={estilos.boton_info_producto}>
                                <Text style={estilos.texto_boton_info_producto}>-</Text>
                            </TouchableOpacity>
                            

                            <Text style={estilos.precio_info_producto}>{cantidad}</Text>

                            <TouchableOpacity onPress={Aumentar} style={estilos.boton_info_producto}>
                                <Text style={estilos.texto_boton_info_producto}>+</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity style={estilos.btn_subir_formu_resena} onPress={Agregar_Carrito}>
                            <Text style={estilos.texto_btn_subir_formu_resena}>Agregar</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={estilos.caja_vendedor_info_producto}>

                        <Image
                            source={require('../img/avatar.png')}
                            resizeMode="contain"
                            style={estilos.img_vendedor_info_producto}
                        />

                        <Text>Vendedor</Text>

                    </View>
                </>
            )}
        </View>
    )
}

export default Info_Producto