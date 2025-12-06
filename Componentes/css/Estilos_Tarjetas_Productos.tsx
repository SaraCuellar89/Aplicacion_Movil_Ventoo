import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({

    // --------- Estilos Tarjeta Producto ---------

    contenedor_tarjeta_producto: {
        backgroundColor: '#FFEDD0',
        width: 140,
        minHeight: 230,
        padding: 5,         
        borderRadius: 10,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#153B40',
        margin: 5,

        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    img_tarjeta_producto: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    caja_info_tarjeta_producto: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nombre_tarjeta_producto: {
        fontSize: 15,
        fontWeight: 500
    },
    precio_tarjeta_producto: {
        fontSize: 18,
        fontWeight: 700
    },



    // --------- Estilos Info Producto ---------

    contenedor_info_producto: {
        width: "100%",    
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingTop: 20
    },
    caja_info_producto: {
        width: '90%',
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#153B40',
        paddingBottom: 30,
        paddingTop: 20,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    titulo_info_producto: {
        fontSize: 20,
        fontWeight: 600,
        padding: 10,
    },
    img_info_producto: {
        width: 270,
        height: 270,
        borderRadius: 10,
    },
    descripcion_info_producto: {
        width: '90%',
    },
    precio_info_producto: {
        fontSize: 18,
        fontWeight: 600
    },
    cantidad_info_producto: {
        fontSize: 15,
    },
    caja_cantidad_info_producto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        paddingVertical: 20
    },
    texto_boton_info_producto: {
        fontSize: 25,
        fontWeight: 700
    },
    boton_info_producto: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    caja_vendedor_info_producto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    img_vendedor_info_producto: {
        width: 40,
        height: 40
    },





    // --------- Estilos Info Producto ---------

    contendor_formu_resena: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10
    },
    input_formu_resena: {
        width: 320,
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        fontSize: 15,
        color: 'black',
        paddingHorizontal: 5
    },
    caja_estrellas_formu_resena: {
        width: 320,
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        overflow: "hidden",
    },
    estrellas_formu_resena:{
        color: 'black',
    },
    btn_subir_formu_resena:{
        backgroundColor: '#BF3326',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 10

    },
    texto_btn_subir_formu_resena: {
        color: '#FFEDD0',
        fontSize: 20,
        fontWeight: 600
    },




    // --------- Estilos Info Producto ---------

    contenedor_tarjeta_resena: {
        width: '90%',
        backgroundColor: '#FFEDD0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
    },
    caja_tarjeta_resena: {
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    caja_usuario_tarjeta_resena: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#153B40',
    },
    resena_tarjeta_resena: {
        width: '100%',
        fontSize: 15
    },
    input_editar: {
        width: '100%',
        backgroundColor: '#FFEDD0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#153B40',
        fontSize: 15,
        color: 'black',
        paddingHorizontal: 5
    },

    caja_btns_tarjeta_resena: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 15
    },
    btn_editar_tarjeta_resena: {
        backgroundColor: '#82BFC7',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    texto_btn_editar_tarjeta_resena: {
        color: 'black',
        fontSize: 16,
        fontWeight: 600
    },
    btn_eliminar_tarjeta_resena: {
        backgroundColor: '#BF3326',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    texto_btn_eliminar_tarjeta_resena: {
        color: '#FFEDD0',
        fontSize: 16,
        fontWeight: 600
    },






    // --------- Estilos Info Carrito ---------

    contenedor_info_carrito: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 40
    },
    titulo_info_carrito: {
        fontSize: 25,
        fontWeight: 700,
        paddingVertical: 10
    },

    caja_productos_info_carrito: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        paddingVertical: 20
    }, 
    producto_info_carrito: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    btn_eliminar_info_carrito: {
        backgroundColor: '#BF3326',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    texto_btn_eliminar_info_carrito: {
        color: '#FFEDD0',
        fontSize: 16,
        fontWeight: 600
    },

    caja_pregunta_info_carrito: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30
    },

    btn_comprar_info_carrito: {
        backgroundColor: '#82BFC7',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    btn_desactivado_info_carrito: {
        backgroundColor: '#787878ff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    texto_btn_comprar_info_carrito: {
        color: 'black',
        fontSize: 20,
        fontWeight: 600
    },




    
})

export default estilos;