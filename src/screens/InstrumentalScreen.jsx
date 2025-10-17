import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import {useEffect, useState} from 'react';

import imagesInstrumental from '../data/imagesInstrumental.js';
import FlatCard from '../components/FlatCard';
import Search from '../components/Search.jsx';
import { selectInstrumental, selectKeyword, filterAndGroupInstrumental, } from '../store/slices/instrumentalSlice.js';
import {useSelector, useDispatch } from 'react-redux';

import useInstruments from '../Hooks/useInstruments.js';
import { colors } from '../theme/color.js';

const InstrumentalScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const categoria = useSelector(state => state.instrumentalReducer.categorieSelected);
    const subcategoria = useSelector(state => state.instrumentalReducer.subCategorieSelected);
    const keyword = useSelector((state) => state.instrumentalReducer.keyword)
    const instrumentosFinal = useSelector((state) => state.instrumentalReducer.instrumentalFilterBySubCategorie)
    //console.log(instrumentosFinal)
    const { instruments: rawInstruments } = useInstruments(categoria, subcategoria);//Obtiene la lista CRUDA de instrumentos filtrada por Categoria y Subcategoria desde Firebase

    useEffect(() => {
        dispatch(filterAndGroupInstrumental(rawInstruments))
    }, [rawInstruments, keyword, dispatch])// rawInstruments cambia cuando el hook de Firebase devuelve nuevos datos

    const handleSelectInstrumental = (item) => {
        dispatch(selectInstrumental(item))
        navigation.navigate('Instrumento')
    }
    const renderInstrumentItem = ({ item }) => (
        <Pressable onPress={() =>  handleSelectInstrumental(item)}>
        <FlatCard style={styles.cardContainer}>
            {/* Validar que la ruta de la imagen exista antes de intentar cargarla */}
            {item.Ruta_imagen && item.Ruta_imagen !== "sin dato" && item.imageKey && imagesInstrumental[item.imageKey] ? (
                //a mejojrar o haceer mas sencillo
                <Image
                    source={imagesInstrumental[item.imageKey]}
                    style={styles.instrumentImage}
                    resizeMode="contain"
                />
            ) : (
                <View style={styles.noImageContainer}>
                    <Text style={styles.noImageText}>Imagen no disponible</Text>
                </View>
            )}

            <View style={styles.textContainer}>
                {/* Visualiza datos Categoria, Marca y Modelo */}
                <Text style={styles.title}>{categoria} - {subcategoria}</Text>

                <Text style={styles.info}>Marca:
                    <Text style={styles.infoBold}> {item.Marca || 'N/A'}   </Text>
                    <Text style={styles.info}>Modelo:
                        <Text style={styles.infoBold}> {item.Modelo || 'N/A'}  </Text>
                    </Text>
                    <Text style={styles.info}>Cantidad:
                        <Text style={styles.infoBold}> {item.cantidad} </Text>
                    </Text>
                </Text>
                
                {/* Descripción */}
                <Text style={styles.description}>Descripción breve: 
                    <Text style={styles.infoBold}> {item.Descripción} </Text>
                </Text>

            </View>
        </FlatCard>
        </Pressable>
    );
    if (rawInstruments.length === 0 && !keyword && (categoria && subcategoria)) {
        return <View style={styles.screenContainer}><Text style={styles.noResultsText}>Cargando instrumentos...</Text></View>;
    }
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.headerText}>
                {categoria} - {subcategoria || 'Sin subcategoría'}
            </Text>
            <Search selectKeyword={selectKeyword} keyword={keyword}/>
            {instrumentosFinal.length > 0 ? (
                <FlatList
                    data={instrumentosFinal}
                    renderItem={renderInstrumentItem}
                    keyExtractor={item => item.ID.toString()}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>
                        No se encontraron instrumentos para:
                    </Text>
                    <Text style={styles.noResultsDetail}>
                        Categoría: {categoria}
                    </Text>
                    <Text style={styles.noResultsDetail}>
                        Subcategoría: {subcategoria}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default InstrumentalScreen

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "#333",
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noResultsText: {
        textAlign: "center",
        fontSize: 18,
        color: "gray",
        marginBottom: 10,
    },
    noResultsDetail: {
        textAlign: "center",
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    cardContainer: {
        marginBottom: 16,
        padding: 16,
        alignItems: "stretch",
    },
    instrumentImage: {
        width: "100%",
        height: 200,
        marginBottom: 12,
        borderRadius: 8,

    },
    noImageContainer: {
        width: "100%",
        height: 150,
        backgroundColor: colors.fondo1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    noImageText: {
        color: "#999",
        fontSize: 14,
    },
    textContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 8,
        color: "#333",
        textAlign: "center",
    },
    info: {
        fontSize: 14,
        marginBottom: 4,
        color: "#666",

    },
    infoBold: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    },
    description: {
        fontSize: 14,
        marginTop: 8,
        color: "#555",
        fontStyle: "italic",
    },
    location: {
        fontSize: 12,
        marginTop: 6,
        color: "#777",
    },


})