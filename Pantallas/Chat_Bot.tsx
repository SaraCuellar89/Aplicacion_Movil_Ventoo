import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Caja_Chat_Bot from "../Componentes/Caja_Chat_Bot";

type Message = {
    id: number;
    tipo: "user" | "bot";
    texto: string;
};

const Chat_Bot = () => {

    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState<Message[]>([
        { id: 1, tipo: "bot", texto: "!Hola! Soy tu Asistente virtual ¿En qué puedo ayudarte?" }
    ]);

    // ===== ENVIAR MENSAJE =====
    const enviarMensaje = async () => {
        if (mensaje.trim() === "") return;

        // --- Agregar mensaje USER ---
        const nuevoUserMsg: Message = {
            id: Date.now(),
            tipo: "user",
            texto: mensaje
        };

        setMensajes((prev) => [...prev, nuevoUserMsg]);
        setMensaje("");

        try {
            const respuesta = await fetch("https://chat-2v4b.onrender.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mensaje })
            });

            const data = await respuesta.json();

            const nuevoBotMsg: Message = {
                id: Date.now() + 1,
                tipo: "bot",
                texto: data.respuesta || "No entendí, intenta de nuevo."
            };

            setMensajes((prev) => [...prev, nuevoBotMsg]);

        } catch (e) {
            const errorMsg: Message = {
                id: Date.now() + 1,
                tipo: "bot",
                texto: "Error al conectar con el servidor."
            };

            setMensajes((prev) => [...prev, errorMsg]);
        }
    };


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <View style={{ flex: 1, backgroundColor: '#F2B279'}}>
                <Encabezado/>

                <Caja_Chat_Bot
                    mensaje={mensaje}
                    mensajes={mensajes}
                    setMensaje={setMensaje}
                    setMensajes={setMensajes}
                    enviarMensaje={enviarMensaje}
                />
            </View>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Chat_Bot