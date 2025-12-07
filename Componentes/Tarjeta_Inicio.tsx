import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, ImageSourcePropType, View, ScrollView } from "react-native";
import estilos from '../Componentes/css/Estilos_Encabezado';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App";

type Props = {
    info_usuario: Usuario | null; 
}

type Usuario = {
    Id_usuario: number;
    Nombre: string;
    Email: string;
    Rol: string;
};

const Tarjeta_Inicio: React.FC<Props> = ({info_usuario}) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#F2B279' }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
        >
            {info_usuario ?
            (
                <>
                    {info_usuario.Rol === 'Cliente' ? 
                    (
                        <View style={estilos.contenedor_tarjetas_inicio}>
                            <TouchableOpacity
                                style={estilos.caja_tarjeta_inicio}
                                onPress={() => navigation.navigate('Opciones')}
                            >
                                <Text style={estilos.texto_tarjeta_inicio}>Entra a tu cuenta</Text>
                                <Image
                                    source={require('../img/perfil-del-usuario.png')}
                                    resizeMode="contain"
                                    style={estilos.img_tarjeta_inicio}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={estilos.caja_tarjeta_inicio}
                                onPress={() => navigation.navigate('Compra')}
                            >
                                <Text style={estilos.texto_tarjeta_inicio}>Compra algo</Text>
                                <Image
                                    source={require('../img/anadir-a-la-cesta.png')}
                                    resizeMode="contain"
                                    style={estilos.img_tarjeta_inicio}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={estilos.caja_tarjeta_inicio}
                                onPress={() => navigation.navigate('Opciones')}
                            >
                                <Text style={estilos.texto_tarjeta_inicio}>Vende tu mismo</Text>
                                <Image
                                    source={require('../img/no-se-vende.png')}
                                    resizeMode="contain"
                                    style={estilos.img_tarjeta_inicio}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : 
                    (
                        <View style={estilos.contenedor_tarjetas_inicio}>
                            <TouchableOpacity
                                style={estilos.caja_tarjeta_inicio}
                                onPress={() => navigation.navigate('Opciones')}
                            >
                                <Text style={estilos.texto_tarjeta_inicio}>Entra a tu cuenta</Text>
                                <Image
                                    source={require('../img/perfil-del-usuario.png')}
                                    resizeMode="contain"
                                    style={estilos.img_tarjeta_inicio}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={estilos.caja_tarjeta_inicio}
                                onPress={() => navigation.navigate('Opciones')}
                            >
                                <Text style={estilos.texto_tarjeta_inicio}>Compra algo</Text>
                                <Image
                                    source={require('../img/anadir-a-la-cesta.png')}
                                    resizeMode="contain"
                                    style={estilos.img_tarjeta_inicio}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={estilos.caja_tarjeta_inicio}
                                onPress={() => navigation.navigate('Opciones')}
                            >
                                <Text style={estilos.texto_tarjeta_inicio}>Vende tu mismo</Text>
                                <Image
                                    source={require('../img/no-se-vende.png')}
                                    resizeMode="contain"
                                    style={estilos.img_tarjeta_inicio}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            ) : 
            (
                <View style={estilos.contenedor_tarjetas_inicio}>
                    <TouchableOpacity
                        style={estilos.caja_tarjeta_inicio}
                        onPress={() => navigation.navigate('Inicio_Sesion')}
                    >
                        <Text style={estilos.texto_tarjeta_inicio}>Entra a tu cuenta</Text>
                        <Image
                            source={require('../img/perfil-del-usuario.png')}
                            resizeMode="contain"
                            style={estilos.img_tarjeta_inicio}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={estilos.caja_tarjeta_inicio}
                        onPress={() => navigation.navigate('Compra')}
                    >
                        <Text style={estilos.texto_tarjeta_inicio}>Compra algo</Text>
                        <Image
                            source={require('../img/anadir-a-la-cesta.png')}
                            resizeMode="contain"
                            style={estilos.img_tarjeta_inicio}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={estilos.caja_tarjeta_inicio}
                        onPress={() => navigation.navigate('Inicio_Sesion')}
                    >
                        <Text style={estilos.texto_tarjeta_inicio}>Vende tu mismo</Text>
                        <Image
                            source={require('../img/no-se-vende.png')}
                            resizeMode="contain"
                            style={estilos.img_tarjeta_inicio}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    )
}

export default Tarjeta_Inicio;
