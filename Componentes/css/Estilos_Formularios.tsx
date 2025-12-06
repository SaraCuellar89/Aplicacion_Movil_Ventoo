import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({

    // --------- Estilos Formu Inicio Sesion ---------

    contenedor_formu_inicio_sesion: {
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,

        backgroundColor: '#FFEDD0',      
        borderRadius: 10,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#153B40',
        paddingVertical: 20
    },
    titulo_formu_inicio_sesion: {
        fontSize: 25,
        fontWeight: 700
    },
    caja_inputs_formu_inicio_sesion: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    inputs_formu_inicio_sesion: {
        width: '100%',
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        fontSize: 15,
        color: 'black',
        paddingHorizontal: 5
    },
    
    caja_btns_formu_inicio_sesion: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    btn_entrar_formu_inicio_sesion: {
        backgroundColor: '#BF3326',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    texto_btn_entrar_formu_inicio_sesion: {
        color: '#FFEDD0',
        fontSize: 20,
        fontWeight: 600
    },
    texto_link_formu_inicio_sesion: {
        fontSize: 15,
        color: '#2c5358ff'
    },




    // --------- Estilos Formu Registro ---------
    caja_rol_registro: {
        width: '100%',
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        overflow: "hidden",
    },
    rol_registro: {
        color: 'black',
    },






    // --------- Estilos Formu Registro Productos ---------

    img_formu_registro_productos: {
        width: 250,
        height: 250,
        borderRadius: 10
    },


    // --------- Estilos Formu Editar Producto ---------

    btn_editar_formu_editar_producto: {
        backgroundColor: '#82BFC7',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    texto_btn_editar_formu_editar_producto: {
        color: 'black',
        fontSize: 20,
        fontWeight: 600
    }
})

export default estilos;