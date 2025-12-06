import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({

    // --------- Estilos Modal PAgo ---------

    contenedor_modal: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    caja_modal: {
        width: '90%',
        minHeight: 300,
        backgroundColor: '#FFEDD0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 25,

        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
    },
    caja_info_modal: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    titulo_info_modal: {
        fontSize: 20,
        fontWeight: 600,
    },
    texto_info_modal: {
        fontSize: 18
    },
    caja_opciones_info_modal: {
        width: '80%',
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        overflow: "hidden",
    },
    opciones_info_modal: {
        color: 'black',
    },

    btn_comprar_modal: {
        backgroundColor: '#82BFC7',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20
    },
    texto_btn_comprar_modal: {
        color: 'black',
        fontSize: 18,
        fontWeight: 600
    },
    btn_cancelar_modal: {
        backgroundColor: '#BF3326',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 15
    },
    texto_btn_cancelar_modal: {
        color: '#FFEDD0',
        fontSize: 16,
        fontWeight: 600
    },





    // --------- Estilos Boton Registrar ---------

    contenedor_boton_registrar: {
        position: 'absolute',
        flex: 1,
        bottom: '25%',
        right: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    boton_registrar: {
        backgroundColor: '#F26A4B',
        borderRadius: 10,
        height: 70,
        width: 70,
        borderWidth: 2,
        borderColor: '#153B40',

        justifyContent: 'center',
        alignItems: 'center',
    },
    mas_boton_registrar: {
        fontSize: 50,
        color: '#FFEDD0'
    }
 
})

export default estilos;