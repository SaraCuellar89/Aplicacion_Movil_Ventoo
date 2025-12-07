import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from '../Componentes/css/Estilos_Tarjetas_Productos'
import { Picker } from "@react-native-picker/picker";


type Props = {
    id_resena: number;
    nombre_usuario: string;
    estrellas: number;
    comentario: string;
    id_usuario_resena: number;
    id_usuario_logueado: number;
    Editar_Resena: (id_resena: number, comentario: string, estrellas: number) => void;
    Eliminar_Resena: (id_resena: number) => void;     
};

const Tarjeta_Resena: React.FC<Props> = ({ id_resena, nombre_usuario, estrellas, comentario, id_usuario_resena, id_usuario_logueado, Editar_Resena, Eliminar_Resena }) => {

    const [input_editar, setInput_editar] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState(comentario);
    const [nuevasEstrellas, setNuevasEstrellas] = useState(estrellas);

    const Editar = () => setInput_editar(!input_editar);


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
                    <>
                        <TextInput placeholder="Escribe una reseña" placeholderTextColor="#153B40" style={estilos.input_editar} value={nuevoComentario} onChangeText={setNuevoComentario}/>

                        <View style={estilos.caja_estrellas_formu_resena}>
                            <Picker 
                                style={estilos.estrellas_formu_resena}
                                selectedValue={nuevasEstrellas}
                                onValueChange={(valor) => setNuevasEstrellas(Number(valor))} 
                            >
                                <Picker.Item label="1 Estrella" value="1"/>
                                <Picker.Item label="2 Estrella" value="2"/>
                                <Picker.Item label="3 Estrella" value="3"/>
                                <Picker.Item label="4 Estrella" value="4"/>
                                <Picker.Item label="5 Estrella" value="5"/>
                            </Picker>
                        </View>
                    </>
                )}

            </View>

            {id_usuario_logueado === id_usuario_resena ? 
            (
                <>
                    {input_editar === false ? 
                    (
                        <View style={estilos.caja_btns_tarjeta_resena}>

                            <TouchableOpacity style={estilos.btn_editar_tarjeta_resena} onPress={Editar}>
                                <Text style={estilos.texto_btn_editar_tarjeta_resena}>Editar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={estilos.btn_eliminar_tarjeta_resena} onPress={() => Eliminar_Resena(id_resena)}>
                                <Text style={estilos.texto_btn_eliminar_tarjeta_resena}>Eliminar</Text>
                            </TouchableOpacity>

                        </View>
                    ) : 
                    (
                        <View style={estilos.caja_btns_tarjeta_resena}>

                            <TouchableOpacity style={estilos.btn_editar_tarjeta_resena} onPress={() => {
                                Editar_Resena(id_resena, nuevoComentario, nuevasEstrellas);
                                setInput_editar(false); // cerrar el input
                            }}>
                                <Text style={estilos.texto_btn_editar_tarjeta_resena}>Editar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={estilos.btn_eliminar_tarjeta_resena} onPress={() => {
                                // Restaurar los valores originales
                                setNuevoComentario(comentario);
                                setNuevasEstrellas(estrellas);
                                setInput_editar(false);
                            }}>
                                <Text style={estilos.texto_btn_eliminar_tarjeta_resena}>Cancelar</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </>
            ) : 
            (
                null
            )}
        </View>
    )
}

export default Tarjeta_Resena