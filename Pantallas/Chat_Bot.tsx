import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Encabezado from "../Componentes/Encabezado";
import Menu from "../Componentes/Menu";
import Caja_Chat_Bot from "../Componentes/Caja_Chat_Bot";

const Chat_Bot = () => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#153B40' }}>

            <View style={{ flex: 1, backgroundColor: '#F2B279'}}>
                <Encabezado/>

                <Caja_Chat_Bot/>
            </View>

            <Menu/>
           
        </SafeAreaView>
    )
}

export default Chat_Bot