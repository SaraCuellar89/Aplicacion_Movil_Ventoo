import { StyleSheet } from "react-native";

const estilos_encabezado = StyleSheet.create({

    // --------- Estilo encabezado ---------

    fondo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F26A4B',
        paddingVertical: 10,
        paddingHorizontal: 30,

        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: '#153B40',
        borderBottomWidth: 3,
        borderWidth: 2,
        elevation: 20
    },
    logo: {
        width: 150,
        minWidth: 100,        
    },
    lupa: {
        width: 30,
        height: 30,
    },
    caja_lupa: {
        backgroundColor: '#BF3326',
        padding: 10,
        borderRadius: 10,
    },



    // --------- Estilo carrusel ---------

    img_carrusel: {
        width: 320,
        minWidth: 150,
        height: 150,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#153B40'
    },
    contenedor_carrusel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },



    // --------- Estilo tarjetas de inicio ---------

    contenedor_tarjetas_inicio: {
        flexDirection: 'row'
    },
    caja_tarjeta_inicio: {
        backgroundColor: '#F26A4B',
        width: 130,
        height: 200,
        padding: 10,         
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        margin: 5,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    texto_tarjeta_inicio : {
        color: '#FFEDD0',
        fontWeight: 600,
    },
    img_tarjeta_inicio: {
        width: 100,
        height: 100,
    },



    
    // --------- Estilo Buscador ---------

    contenedor_buscador: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_regresar: {
        width: 320,
        paddingVertical: 20,
    },
    texto_btn_regresar:{
        fontSize: 20,
        fontWeight: 700
    },
    input_buscador: {
        width: 320,
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        fontSize: 15,
        color: 'black',
        paddingHorizontal: 5
    },



    // --------- Estilos Filtros ---------
    contenendor_filtros: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 25
    },
    caja_filtro: {
        width: '50%',
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        overflow: "hidden",
    },
    filtro: {
        color: 'black',
    },
})

export default estilos_encabezado;