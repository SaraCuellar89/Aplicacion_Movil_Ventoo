import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from "../Componentes/css/Estilos_Modal";

const Caja_Chat_Bot = () => {
    return (
        <ScrollView
            style={estilos.scroll}
            contentContainerStyle={estilos.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
        >

            <View style={estilos.contenedor_caja_chat_bot}>

                <Text style={estilos.titulo_chat_bot}>ChatBot</Text>

                {/* ===== MENSAJES ===== */}
                <View style={estilos.lista_mensajes}>

                    {/* MENSAJE USER */}
                    <View style={estilos.caja_user_caja_chat_bot}>
                        <View style={estilos.user_caja_chat_bot}>
                            <Text style={estilos.texto_user_caja_chat_bot}>
                                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
                            </Text>
                        </View>
                        <Image
                            source={require("../img/avatar.png")}
                            resizeMode="contain"
                            style={estilos.img_caja_chat_bot}
                        />
                    </View>

                    {/* MENSAJE BOT */}
                    <View style={estilos.caja_bot_caja_chat_bot}>
                        <Image
                            source={require("../img/logo_bot.png")}
                            resizeMode="contain"
                            style={estilos.img_caja_chat_bot}
                        />
                        <View style={estilos.bot_caja_chat_bot}>
                            <Text>
                                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto...
                            </Text>
                        </View>
                    </View>

                    {/* MENSAJE BOT CORTO */}
                    <View style={estilos.caja_bot_caja_chat_bot}>
                        <Image
                            source={require("../img/logo_bot.png")}
                            resizeMode="contain"
                            style={estilos.img_caja_chat_bot}
                        />
                        <View style={estilos.bot_caja_chat_bot}>
                            <Text>Lorem Ipsum</Text>
                        </View>
                    </View>

                </View>

                {/* ===== INPUT ===== */}
                <View style={estilos.caja_input}>
                    <TextInput
                        style={estilos.input}
                    />
                    <TouchableOpacity>
                        <Image
                            source={require("../img/abajo.png")}
                            resizeMode="contain"
                            style={estilos.icon_enviar}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

export default Caja_Chat_Bot;
