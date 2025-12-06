import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Buscador from "../Componentes/Buscador";
import Filtros from "../Componentes/Filtros";
import estilos from '../Pantallas/css/Estilos_Principal';
import Tarjeta_Producto from "../Componentes/Tarjeta_Producto";


type Producto = {
    Id_producto: number;
    Nombre: string;
    Precio: number;
    Imagen: string;
};

const Compra = () => {

    const [productos, setProductos] = useState<Producto[]>([]);

    //Obtener productos
    useEffect(() => {
        const Obtener_Productos = async () => {
            try{
                const res = await fetch('https://backend-ventoo.vercel.app/productos')
                const datos = await res.json()

                setProductos(datos.productos)
            }
            catch(error){
                console.log('Error: ' + error)
            }
        }

        Obtener_Productos()
    }, [])

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F2B279'}}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <View>
                    <Encabezado/>

                    <View style={estilos.caja_compra}>
                        <Buscador
                            productos={(productos) => setProductos(productos)} 
                        />
                        <Filtros 
                            productos={(productos) => setProductos(productos)} 
                        />
                    </View>

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

export default Compra