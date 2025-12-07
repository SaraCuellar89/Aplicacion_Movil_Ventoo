import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import estilos from '../Componentes/css/Estilos_Encabezado';

type Props = {
    precio: string;
    setPrecio: (value: string) => void;
    resetear_filtro: () => void;
    Filtrar_Precio: (value: string) => void;
    categoriaSeleccionada: number;
    setCategoriaSeleccionada: (value: number) => void;
    Filtrar_Categoria: (value: number) => void;
    categorias: Categoria[];
}


type Categoria = {
    Id_categoria: number;
    Nombre_categoria: string;
}


const Filtros: React.FC<Props> = ({precio, setPrecio, resetear_filtro, Filtrar_Precio, categoriaSeleccionada, setCategoriaSeleccionada, Filtrar_Categoria, categorias}) => {
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
                    <Picker.Item label="Precio" value="0"/>
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