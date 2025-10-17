import { StyleSheet, Text, View, FlatList, Pressable,ImageBackground } from 'react-native'
import React, {useMemo} from 'react'

import FlatCard from '../components/FlatCard'
import { selectSubCategorie } from '../store/slices/instrumentalSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import useSubcategory from '../Hooks/useSubCategories.js';
import fondoApp from '../assets/fondo_app.png'


const SubProductsScreen = ({navigation}) => {
    //console.log(route)
    const dispatch = useDispatch();
    const categoria = useSelector(state => state.instrumentalReducer.categorieSelected);

    const { subcategories: uniqueSubCategories } = useSubcategory(categoria); // desestructuro y rernombrado el objeto que nos devuelve el hook subcategories
    

    const handleSelectSubProduct = (subCat) => {
        dispatch(selectSubCategorie(subCat));
        navigation.navigate('Instrumentos');
    };
    const renderInstrumentalItem = ({item})=> (
        <Pressable onPress={() => handleSelectSubProduct(item)}>
            <FlatCard>
                <Text style={styles.title}>{item}</Text>
            </FlatCard>
        </Pressable>
    );
    if (uniqueSubCategories.length === 0) {
        // Manejar el estado de carga o sin resultados
        return <View style={styles.screenContainer}><Text>{`Cargando subcategorías para: ${categoria}...`}</Text></View>;
    }
    return (
        <ImageBackground source={fondoApp} resizeMode="repeat" style={styles.backgroundImage}>
            <View style={styles.screenContainer}>
                <Text>{`Subcategorías de: ${categoria}`}</Text>
                <FlatList
                    data={uniqueSubCategories}
                    renderItem={renderInstrumentalItem}
                    keyExtractor={(item) => item}
                />
            </View>
        </ImageBackground>
    )
}

export default SubProductsScreen

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "transparent",
    },
    backgroundImage: {
        flex: 1, // Asegura que ocupe toda la pantalla
        backgroundColor: "#f2f2f2",
    },
    title:{
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 10,
    }
})