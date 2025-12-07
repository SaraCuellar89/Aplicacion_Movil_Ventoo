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

type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}



const Compra = () => {

    // ============ Estado necesario para renderizar los productos ============
    const [productos, setProductos] = useState<Producto[]>([]);



    // ============ Obtener Todos los productos ============
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



    // ============ Estados necesarios para listar las categorias ============
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number>(0)



    // ============ Obtener todas las categorias ============
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



    // ============ Funcion para filtrar por categorias ============
    const [precio, setPrecio] = useState('')
    const Filtrar_Categoria = async (id_categoria: number) => {
        try{
            const res = await fetch('https://backend-ventoo.vercel.app/filtrar_categoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_categoria})
            })

            const datos = await res.json()

            setProductos(datos.productos)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }



    // ============ Funcion para filtrar por precio ============
    const Filtrar_Precio = async (orden: string) => {
        try{
            const res = await fetch('https://backend-ventoo.vercel.app/filtrar_precio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({orden})
            })

            const datos = await res.json()

            setProductos(datos.productos)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    // ============ Funcion para reseterar los filtros ============
    const resetear_filtro = async () => {
        setCategoriaSeleccionada(0) // vuelve al valor por defecto
        setPrecio('')
        
        try {
            const res = await fetch('https://backend-ventoo.vercel.app/productos')
            const datos = await res.json()

            setProductos(datos.productos)
        } catch(error) {
            console.log('Error al cargar todos los productos:', error)
        }
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

                    <View style={estilos.caja_compra}>
                        <Buscador
                            setProductos={setProductos}
                        />
                        <Filtros 
                            precio={precio}                           
                            setPrecio={setPrecio}                     
                            resetear_filtro={resetear_filtro}         
                            Filtrar_Precio={Filtrar_Precio}           
                            categoriaSeleccionada={categoriaSeleccionada}   
                            setCategoriaSeleccionada={setCategoriaSeleccionada} 
                            Filtrar_Categoria={Filtrar_Categoria}   
                            categorias={categorias}    
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