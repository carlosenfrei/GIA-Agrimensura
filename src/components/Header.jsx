import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../theme/color.js';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import images from '../data/imagesCategories.js';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/userSlice.js';
import { auth } from '../services/db.js';
import { signOut } from 'firebase/auth';

const Header = ({subtitle}) => {
    const navigation= useNavigation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userReducer.user);
    const isLoggedIn = !!user;

    const handleAuthPress = async () => {
        if (isLoggedIn) {
        try {
            await signOut(auth);
            dispatch(clearUser());
            console.log("Sesión cerrada correctamente");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
        } else {
        navigation.navigate("AuthStack");;
        }
    };

    return (
    <View style={styles.container}>
        <View style={styles.centerContainer}>
            <Text style = {styles.title1}>GIA</Text>
            <Text style = {styles.title2}>Gestion Instrumental de Agrimensura</Text>

            {subtitle && (<View style={styles.subtitleRow}>
                    {navigation.canGoBack() && 
                        <Pressable 
                            onPress={()=> navigation.goBack()}
                            style={styles.backButton} // Nuevo estilo para margen
                        >
                            <Ionicons 
                                name="arrow-back-outline" 
                                size={20} // Tamaño un poco más grande
                                color={colors.texto1}
                            />
                        </Pressable>
                    }
                    <Text style={styles.title3}>{subtitle}</Text>
                </View>
            )}
            
        </View>

        <View style={styles.rightGroup}>
            <Pressable onPress={handleAuthPress} style={styles.rightButton} >
                <Ionicons
                    name={isLoggedIn ? "exit-outline" : "enter-outline"}
                    size={28}
                    color={colors.texto1}
                />
                <Text style={styles.authText}>{isLoggedIn ? 'Salir' : 'Login'}</Text>
            </Pressable>
        </View>
    </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        height:140,
        backgroundColor:colors.dptoAgrim,
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 10
    },
    centerContainer: {
        flex: 1, 
        alignItems: 'center',
    },
    leftContainer: {
        width: 50, // Ancho fijo para el logo
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 10,
    },
    rightGroup: {
        flexDirection: 'row', // Para alinear el carrito y el login
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightButton: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    },
    logo: {
        width: 40,
        height: 40,
        tintColor: colors.texto1, 
    },
    subtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5, // Mantener el margen superior
    },
    backButton: {
        marginRight: 5,
        // Alínea el icono verticalmente con el texto
        paddingTop: 1, 
    },
    //'Roboto-ExtraBold': require('./assets/fonts/Roboto-ExtraBold.ttf'),
    //'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    //'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    //'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    title1:{
        marginTop:20,
        fontSize: 32,
        color:colors.texto1,
        fontFamily: "Roboto-ExtraBold",
        lineHeight: 32,
    },
    title2:{
        fontSize: 15,
        color:colors.texto2,
        textAlign: 'center',
        lineHeight: 16,
    },
    title3: { 
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.texto1,
        marginTop: 5,
        textAlign: 'center',
    }

})