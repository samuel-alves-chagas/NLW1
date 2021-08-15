import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
} from "react-native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";

import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const Points = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        api.get("items").then((response) => {
            setItems(response.data);
        });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail() {
        navigation.navigate("Detail");
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex((item) => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter((item) => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo</Text>
                <Text style={styles.description}>
                    Encontre no mapa um ponto de coleta.
                </Text>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -22.2209285,
                            longitude: -45.7236775,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                    >
                        <Marker
                            style={styles.mapMarker}
                            coordinate={{
                                latitude: -22.2209285,
                                longitude: -45.7236775,
                            }}
                            onPress={handleNavigateToDetail}
                        >
                            <View style={styles.mapMarkerContainer}>
                                <Image
                                    source={{
                                        uri: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=600",
                                    }}
                                    style={styles.mapMarkerImage}
                                ></Image>
                                <Text style={styles.mapMarkerTitle}>
                                    Mercado
                                </Text>
                            </View>
                        </Marker>
                    </MapView>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {items.map((item) => (
                        <TouchableOpacity
                            key={String(item.id)}
                            style={[
                                styles.item,
                                selectedItems.includes(item.id)
                                    ? styles.selectedItem
                                    : {},
                            ]}
                            onPress={() => {
                                handleSelectItem(item.id);
                            }}
                            activeOpacity={0.6}
                        >
                            <SvgUri
                                width={42}
                                height={42}
                                uri={item.image_url}
                            ></SvgUri>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        fontSize: 20,
        fontFamily: "Ubuntu_700Bold",
        marginTop: 24,
    },

    description: {
        color: "#6C6C80",
        fontSize: 16,
        marginTop: 4,
        fontFamily: "Roboto_400Regular",
    },

    mapContainer: {
        flex: 1,
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 16,
    },

    map: {
        width: "100%",
        height: "100%",
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: "#34CB79",
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: "cover",
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: "Roboto_400Regular",
        color: "#FFF",
        fontSize: 13,
        lineHeight: 23,
    },

    itemsContainer: {
        flexDirection: "row",
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#eee",
        height: 120,
        width: 120,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: "center",
        justifyContent: "space-between",

        textAlign: "center",
    },

    selectedItem: {
        borderColor: "#34CB79",
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: "Roboto_400Regular",
        textAlign: "center",
        fontSize: 13,
    },
});

export default Points;
