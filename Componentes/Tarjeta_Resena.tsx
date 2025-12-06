import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'


type Props = {
    id_resena: number;
    nombre_usuario: string;
    estrellas: number;
    comentario: string;
};

const Tarjeta_Resena: React.FC<Props> = ({ id_resena, nombre_usuario, estrellas, comentario }) => {


    const [input_editar, setInput_editar] = useState(false)

    const Editar = () => {
        if(input_editar === false) setInput_editar(true)
        else setInput_editar(false)
    }


    return(
        <View style={estilos.contenedor_tarjeta_resena}>
            <View style={estilos.caja_tarjeta_resena}>
                
                <View style={estilos.caja_usuario_tarjeta_resena}>
                    <Text>{nombre_usuario}</Text>
                    <Text>{"★".repeat(estrellas) + "☆".repeat(5 - estrellas)}</Text>
                </View>

                {input_editar === false ? 
                (
                    <Text style={estilos.resena_tarjeta_resena}>{comentario}</Text>
                ) : 
                (
                    <TextInput placeholder="Escribe una reseña" placeholderTextColor="#153B40" style={estilos.input_editar}/>
                )}

            </View>

            <>
                {input_editar === false ? 
                (
                    <View style={estilos.caja_btns_tarjeta_resena}>

                        <TouchableOpacity style={estilos.btn_editar_tarjeta_resena} onPress={Editar}>
                            <Text style={estilos.texto_btn_editar_tarjeta_resena}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_eliminar_tarjeta_resena}>
                            <Text style={estilos.texto_btn_eliminar_tarjeta_resena}>Eliminar</Text>
                        </TouchableOpacity>

                    </View>
                ) : 
                (
                    <View style={estilos.caja_btns_tarjeta_resena}>

                        <TouchableOpacity style={estilos.btn_editar_tarjeta_resena} onPress={Editar}>
                            <Text style={estilos.texto_btn_editar_tarjeta_resena}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.btn_eliminar_tarjeta_resena}>
                            <Text style={estilos.texto_btn_eliminar_tarjeta_resena}>Cancelar</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </>
        </View>
    )
}

export default Tarjeta_Resena