import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import estilos from '../Componentes/css/Estilos_Encabezado';

type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}

type Props = {
  productos: (productos: any[]) => void;
}


const Filtros: React.FC<Props> = ({productos}) => {

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number>(0)
    const [precio, setPrecio] = useState('')

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



    //Filtrar por categoria
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

            productos(datos.productos)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    //Filtrar por precio
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

            productos(datos.productos)
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    //Resetear filtro
    const resetear_filtro = async () => {
        setCategoriaSeleccionada(0) // vuelve al valor por defecto
        setPrecio('')
        
        try {
            const res = await fetch('https://backend-ventoo.vercel.app/productos')
            const datos = await res.json()

            productos(datos.productos)
        } catch(error) {
            console.log('Error al cargar todos los productos:', error)
        }
    }

    return(
        <View style={estilos.contenendor_filtros}>
            
            <View style={estilos.caja_filtro}>
                <Picker 
                    style={estilos.filtro}
                    selectedValue={precio}
                    onValueChange={(valor: string) => {
                        setPrecio(valor)
                        if (valor === '0') {
                            resetear_filtro()
                        } else {
                            Filtrar_Precio(valor)
                        }
                    }}
                >
                    <Picker.Item label="Precio" value={0}/>
                    <Picker.Item label="Mayor a Menor Precio" value="desc" />
                    <Picker.Item label="Menor a Mayor Precio" value="asc" />
                </Picker>
            </View>

            <View style={estilos.caja_filtro}>
                <Picker
                    style={estilos.filtro}
                    selectedValue={categoriaSeleccionada}
                    onValueChange={(id: number) => {
                        if (id === 0) {
                            resetear_filtro();
                        } else {
                            setCategoriaSeleccionada(id);
                            Filtrar_Categoria(id);
                        }
                    }}
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
    )
}

export default Filtros