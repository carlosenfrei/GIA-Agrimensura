import { StyleSheet, Text, View, FlatList, Image, Pressable, Linking, Alert, ImageBackground } from 'react-native'; //Animated
//import {useRef} from 'react';
//import  categories from "../data/categories.json";
import FlatCard from '../components/FlatCard';
import images from '../data/imagesCategories.js';
import TextRobotoExtraBold from '../components/customText/TextRobotoExtraBold.jsx';
import {useSelector, useDispatch } from 'react-redux';
import { selectCategorie } from '../store/slices/instrumentalSlice.js'
import { colors } from '../theme/color.js'
import useCategory from '../Hooks/useCategory.js';
import fondoApp from '../assets/fondo_app.png'


const CategoriesScreen = ({navigation}) => {
    const { categories } = useCategory();
    const dispatch = useDispatch();
    //const userType = useSelector((state) => state.userReducer.userType);
    //console.log("UserType desde Redux:", userType);
    /*const visibleCategories = categories.filter((cat) => {
    if (cat.Categoria?.toLowerCase() === "admin" && !userType) {
      return false; // Ocultamos “Admin” si el usuario no es admin
    }
    return true;
    });*/

    const handleSelectCategorie = (item) => {
        if (item.Categoria.toLowerCase() === "geo portal") {
        // Si es la card "Geo Portal", abre el sitio web
        const url = "http://geo.fi.uba.ar/";
            Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                Linking.openURL(url);
                } else {
                Alert.alert("Error", "No se puede abrir la URL");
                }
            })
            .catch((error) => console.error("Error al abrir la URL:", error));
        } else if (item.Categoria.toLowerCase() === "ingreso") {
            navigation.navigate("AuthStack");
        } else {
            dispatch(selectCategorie(item.Categoria));
            navigation.navigate("Clasificacion", { categoria: item.Categoria });
        }
    };
    //const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const renderCategoryItem = ({item})=>(
       //        <Pressable onPress={()=> handlePress(item) } style={styles.categoriesContainer}> 
        <Pressable onPress={() => handleSelectCategorie(item)} style={({ pressed }) => [styles.categoriesContainer, pressed && styles.pressedCard]}>
            <FlatCard >
                        <Image  source={images[item.image]} 
                            style={styles.categoryImage}
                            resizeMode="contain"
                        />
                        <TextRobotoExtraBold> {item.Categoria} </TextRobotoExtraBold>
                
            </FlatCard>
        </Pressable>
    )
    return (
        <ImageBackground 
        source={fondoApp} 
        resizeMode="repeat" 
        style={styles.backgroundImage} 
        >
            <View style={styles.screenContainer}>
                <FlatList 
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor= {item => item.ID.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </ImageBackground>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    categoriesContainer: {
        width: "48%",
        marginBottom: 16,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#eeeaeaff",
        //transform: [{ scale: 1 }],
        transitionDuration: "150ms"
    },
    pressedCard: {
    backgroundColor: colors.institucional, // gris más intenso al presionar
    transform: [{ scale: 1.03 }], // leve agrandamiento
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 8,
    },
    categoryImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
    },
    backgroundImage: {
        flex: 1, // Asegura que ocupe toda la pantalla
        backgroundColor: '#f2f2f2',
    }
})