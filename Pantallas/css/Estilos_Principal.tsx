import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({

    // --------- Estilos Principal ---------

    fondo_principal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F26A4B'
    },
    logo : {
        width: 300,
        minWidth: 100,        
    },



    // --------- Estilos Inicio ---------

    contenedor_inicio: {
        flex: 1,
        backgroundColor: '#F2B279',
        paddingBottom: 30,
    },
    contenedor_tarjetas_inicio : {
        backgroundColor: '#F2B279',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    caja_tarjetas_inicio: {
        width: 330,
        minHeight: 230,
    },


    btn_ver: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    texto_btn_ver: {
        fontSize: 20,
        fontWeight: 700
    },

    


    // --------- Estilos Buscador ---------
    contenedor_buscar: {
        flex: 1,
    },
    caja_tarjetas_productos_buscar: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        paddingVertical: 20
    },



    // --------- Estilos Compra ---------
    caja_compra: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 20
    },




    // --------- Estilos Ver Producto ---------
    texto_ver_producto: {
        width: '100%',
        fontSize: 20,
        fontWeight: 700,
        paddingTop: 60,
        paddingBottom: 10,
        paddingHorizontal: 20
    },

    caja_ver_productos: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        gap: 20,
        paddingBottom: 30
    },

    opinion_ver_productos: {
        backgroundColor: '#FFEDD0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:10,
        
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginVertical: 25
    },
    puntuacion_ver_productos: {
        fontSize: 18,
        fontWeight: 600
    },
    estrellas_ver_productos: {
        fontSize: 22,
        color: '#BF3326'
    },

    caja_resenas_ver_productos: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap:10,
        paddingVertical: 10
    },



    // --------- Estilos Inicio de Sesion ---------

    caja_inicio_sesion: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40
    }




    // --------- Estilos Pedidos ---------
    

})

export default estilos;