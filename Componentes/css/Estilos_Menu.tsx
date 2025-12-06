import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({

    // --------- Estilos Memu ---------

    contenedor_menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#BF3326',
        padding: 10,         
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
    },
    img_opcion_menu: {
        width: 25,
        height: 25,
    },
    btn_img_opcion_menu: {
        backgroundColor: '#F26A4B',
        padding: 10,
        borderRadius: 10,
        elevation: 10
    },




    // --------- Estilos Caja Opcion ---------
    contenedor_opcion: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 20
    },
    titulo_opciones: {
        fontSize: 25,
        fontWeight: 800,
        paddingVertical: 10
    },
    btn_opcion: {
        width: 320,
        height: 40,
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto_btn_opcion: {
        fontSize: 18,
        fontWeight: 600
    },

    caja_info_usuario: {
        width: '90%',
        minHeight: 150,
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',

        justifyContent: 'space-around',
        alignItems: 'center'
    },

    btn_cerrar_sesion: {
        marginTop: 30,
        width: '90%',
        backgroundColor: '#F26A4B',
        padding: 10,
        borderRadius: 10,
        elevation: 10,

        justifyContent: 'center',
        alignItems: 'center',
    },




    // --------- Estilos Caja Opcion ---------
    contenedor_tarjeta_pedido: {
        width: '90%',
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        padding: 10,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    codigo_tarjeta_pedido: {
        fontSize: 18,
        fontWeight: 600
    },
    texto_tarjeta_pedido: {
        fontSize: 15,
    }
})

export default estilos;