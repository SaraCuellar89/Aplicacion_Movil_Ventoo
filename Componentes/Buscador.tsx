import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Encabezado';

type Props = {
    setProductos: (productos: any[]) => void;
}

const Buscador: React.FC<Props> = ({setProductos}) => {


    // ============ Buscar Productos por su nombre ============
    const [nombre, setNombre] = useState('')

    const Buscar_Nombre = async () => {

        try{
            const res = await fetch('https://backend-ventoo.vercel.app/buscar_nombre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre})
            })

            const datos = await res.json()

            setProductos(datos.productos)
            setNombre('')
        }
        catch(error){
            console.log('Error: ' + error)
        }
    }


    return(
        <View style={estilos.contenedor_buscador}>
            <TextInput style={estilos.input_buscador} value={nombre} onChangeText={(texto) => setNombre(texto)} onSubmitEditing={Buscar_Nombre} placeholder="Buscar" placeholderTextColor="#153B40"/>
        </View>
    )
}

export default Buscador