import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Principal from "./Pantallas/Principal";
import Inicio from "./Pantallas/Inicio";
import Buscar from "./Pantallas/Buscar";
import Opciones from "./Pantallas/Opciones";
import Compra from "./Pantallas/Compra";
import Ver_Producto from "./Pantallas/Ver_Producto";
import Inicio_Sesion from "./Pantallas/Inicio_Sesion";
import Registro from "./Pantallas/Registro";
import Pedidos from "./Pantallas/Pedidos";
import Ver_Pedido from "./Pantallas/Ver_Pedido";
import Carrito from "./Pantallas/Carrito";
import Productos_Vendedor from "./Pantallas/Productos_Vendedor";
import Registro_Productos from "./Pantallas/Registro_Productos";
import Editar_Producto from "./Pantallas/Editar_Producto";

export type RootStackParamList = {
    Principal: undefined,
    Inicio: undefined,
    Buscar: undefined,
    Opciones: undefined,
    Compra: undefined,
    Ver_Producto: { id_producto: number },
    Inicio_Sesion: undefined,
    Registro: undefined,
    Pedidos: undefined, 
    Ver_Pedido: { id_pedido: number },
    Carrito: undefined,
    Productos_Vendedor: undefined,
    Registro_Productos: undefined,
    Editar_Producto: { id_producto: number }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Carrito">
                <Stack.Screen 
                    name="Principal" 
                    component={Principal} 
                    options={{ 
                        headerShown: false 
                    }}
                />
                <Stack.Screen 
                    name="Inicio" 
                    component={Inicio} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Buscar" 
                    component={Buscar} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Opciones" 
                    component={Opciones} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Compra" 
                    component={Compra} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Ver_Producto" 
                    component={Ver_Producto} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Inicio_Sesion" 
                    component={Inicio_Sesion} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Registro" 
                    component={Registro} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Pedidos" 
                    component={Pedidos} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Ver_Pedido" 
                    component={Ver_Pedido} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Carrito" 
                    component={Carrito} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Productos_Vendedor" 
                    component={Productos_Vendedor} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Registro_Productos" 
                    component={Registro_Productos} 
                    options={{ 
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Editar_Producto" 
                    component={Editar_Producto} 
                    options={{ 
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
