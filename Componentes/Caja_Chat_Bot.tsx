import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from "../Componentes/css/Estilos_Modal";

type Message = {
    id: number;
    tipo: "user" | "bot";
    texto: string;
};

type Props = {
    mensaje: string;
    mensajes: Message[];
    setMensaje: React.Dispatch<React.SetStateAction<string>>;
    setMensajes: React.Dispatch<React.SetStateAction<Message[]>>;
    enviarMensaje: () => void;
};

const Caja_Chat_Bot: React.FC<Props> = ({mensaje, mensajes, setMensaje, setMensajes, enviarMensaje}) => {

    return (
        <ScrollView
            style={estilos.scroll}
            contentContainerStyle={estilos.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
        >

            <View style={estilos.contenedor_caja_chat_bot}>

                <Text style={estilos.titulo_chat_bot}>ChatBot</Text>

                {/* ===== MENSAJES DINÁMICOS ===== */}
                <View style={estilos.lista_mensajes}>
                    {mensajes.map((msg) => (
                        <View
                            key={msg.id}
                            style={
                                msg.tipo === "user"
                                    ? estilos.caja_user_caja_chat_bot
                                    : estilos.caja_bot_caja_chat_bot
                            }
                        >
                            {/* AVATAR */}
                            {msg.tipo === "bot" && (
                                <Image
                                    source={require("../img/logo_bot.png")}
                                    resizeMode="contain"
                                    style={estilos.img_caja_chat_bot}
                                />
                            )}

                            {/* BURBUJA */}
                            <View
                                style={
                                    msg.tipo === "user"
                                        ? estilos.user_caja_chat_bot
                                        : estilos.bot_caja_chat_bot
                                }
                            >
                                <Text
                                    style={
                                        msg.tipo === "user"
                                            ? estilos.texto_user_caja_chat_bot
                                            : undefined
                                    }
                                >
                                    {msg.texto}
                                </Text>
                            </View>

                            {/* AVATAR USER */}
                            {msg.tipo === "user" && (
                                <Image
                                    source={require("../img/avatar.png")}
                                    resizeMode="contain"
                                    style={estilos.img_caja_chat_bot}
                                />
                            )}
                        </View>
                    ))}
                </View>

                {/* ===== INPUT ===== */}
                <View style={estilos.caja_input}>
                    <TextInput
                        style={estilos.input}
                        value={mensaje}
                        onChangeText={setMensaje}
                        placeholder="Escribe un mensaje..."
                    />

                    <TouchableOpacity onPress={enviarMensaje}>
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
