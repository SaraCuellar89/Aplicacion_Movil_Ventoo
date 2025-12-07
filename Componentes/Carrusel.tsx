import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, View, Dimensions } from "react-native";
import estilos from "../Componentes/css/Estilos_Encabezado";
import { Animated } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const data = [
    { id: "1", img: require("../img/banner_3.gif") },
    { id: "2", img: require("../img/banner_2.gif") },
    { id: "3", img: require("../img/banner_4.gif") },
    { id: "4", img: require("../img/banner_6.gif") },
];

const Carrusel = () => {

    const scrollX = useRef(new Animated.Value(0)).current;

    const flatListRef = useRef<FlatList>(null);
    const [indexActual, setIndexActual] = useState(0);

  useEffect(() => {
        const intervalo = setInterval(() => {
        let nextIndex = indexActual + 1;
        if (nextIndex >= data.length) nextIndex = 0;

        flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });

        setIndexActual(nextIndex);
        }, 4000);

        return () => clearInterval(intervalo);
    }, [indexActual]);

    return (
        <View style={estilos.contenedor_carrusel}>
            <View style={estilos.caja_carrusel}>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    getItemLayout={(_, index) => ({
                        length: SCREEN_WIDTH,
                        offset: SCREEN_WIDTH * index,
                        index,
                    })}
                    renderItem={({ item }) => (
                        <View style={{ width: SCREEN_WIDTH, height: "100%" }}>
                            <Image
                                source={item.img}
                                resizeMode="cover"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default Carrusel;
