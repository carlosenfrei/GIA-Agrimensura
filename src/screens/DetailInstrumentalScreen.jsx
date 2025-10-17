import { StyleSheet, Text, View, Image, Pressable, Linking, Alert,ImageBackground } from 'react-native'
import React from 'react'
import FlatCard from '../components/FlatCard'
import imagesInstrumental from '../data/imagesInstrumental.js';
import { colors } from '../theme/color.js'; 
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addItem, selectCartItems } from '../store/slices/cartSlice.js'
import fondoApp from '../assets/fondo_app.png'

const DetailInstrumentalScreen = ({navigation}) => {
    const instrumento = useSelector((state) => state.instrumentalReducer.instrumentalSelect)
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const localId = useSelector((state) => state.userReducer.localId);
    const instrumentInCart = cartItems.some(cartItem => 
        cartItem.ID === instrumento.ID && cartItem.unidad === instrumento.unidad
    );
    const isDisabled = instrumentInCart || localId === "";


// FUNCIONES DE MANEJO DE ACCIONES (Sin cambios, solo se incluyen para que no haya errores)
    if (!instrumento || Object.keys(instrumento).length === 0) {
    return (
        <View style={styles.emptyContainer}>
            <Text>No se encontró información del instrumento seleccionado.</Text>
        </View>
    )
    }
    const handleOpenLink = async (url, actionName) => {
        if (!url || url === 'S/D' || url === 'sin dato') {
            Alert.alert(`No Disponible`, `El enlace de ${actionName} no está disponible para este instrumento.`, [{ text: 'OK' }]);
            return;
        }
        
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('Error', `No se pudo abrir la URL: ${url}`);
            }
        } catch (error) {
            console.error('Error al abrir enlace:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar abrir el enlace.');
        }
    };

    const handleOpenManual = () => {
        const manualUrl = instrumento.Ruta_manual;

        if (!manualUrl || manualUrl === "S/D" || manualUrl === "sin dato") {
            Alert.alert("No disponible", "No hay manual asociado a este instrumento.");
            return;
        }

        // Llamamos a la función handleOpenLink con la URL de Drive
        // Esta URL de "vista" (view?usp=sharing) SÍ funciona perfecto para abrir el navegador.
        handleOpenLink(manualUrl, 'Manual');
    };

    const handleSponsorLink = () => {
        // URL de ejemplo de sponsor
        const sponsorUrl = 'https://www.google.com'; 
        handleOpenLink(sponsorUrl, 'Sponsor');
    };

    const handleReservarUnidad = (unidad) => {
        const cleanInstrumento = {
            ID: instrumento.ID,
            unidad: instrumento.unidad, // Asumo que estos son los campos necesarios
            Marca: instrumento.Marca,
            Modelo: instrumento.Modelo,
            Categoria: instrumento.Categoria,
            SubCategoria: instrumento.SubCategoria,
            imageKey: instrumento.imageKey,
            Ruta_manual: instrumento.Ruta_manual,
            Estado: instrumento.Estado,
            Descripción: instrumento.Descripción,
            Patrimonio: instrumento.Patrimonio, 
            Numero_de_Serie: instrumento.Numero_de_Serie, 
            // Añade o quita cualquier otro campo de dato simple que necesites
        };
        dispatch(addItem(cleanInstrumento));
        Alert.alert('Añadido al carrito', `La unidad ${unidad.unidad} fue agregada a tu reserva.`);
    };

    return (
        <ImageBackground source={fondoApp} resizeMode="repeat" style={styles.backgroundImage}>
            <View style={styles.containerDetail}>
                <FlatCard style={styles.card}>
                    <Text style={styles.title}>
                        {instrumento.Categoria} - {instrumento.SubCategoria}
                    </Text>
                    <Image
                        source={imagesInstrumental[instrumento.imageKey]}
                        style={styles.instrumentImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.info}>Marca:
                        <Text style={styles.infoBold}> {instrumento.Marca || 'N/A'}   </Text>
                        <Text style={styles.info}>Modelo:
                            <Text style={styles.infoBold}> {instrumento.Modelo || 'N/A'}  </Text>
                        </Text>
                        <Text style={styles.info}>Estado:
                            <Text style={styles.infoBold}> {instrumento.Estado || 'N/A'}  </Text>
                        </Text>
                        
                    </Text>
                    {/* Descripción */}
                    <Text style={styles.description}>Descripción: 
                        <Text style={styles.infoBold}> {instrumento.Descripción} </Text>
                    </Text>
                    <View style={styles.buttonContainer}>
                    
                    {/* botones */}
                    <Pressable 
                        onPress={handleOpenManual} 
                        style={({ pressed }) => [styles.button, styles.downloadButton, pressed && styles.buttonPressed]}
                    >
                        <Text style={styles.botonText}> Manual</Text>
                    </Pressable>
                    
                    <Pressable 
                        onPress={handleSponsorLink} 
                        style={({ pressed }) => [styles.button, styles.sponsorButton, pressed && styles.buttonPressed]}
                    >
                        <Text style={styles.botonText}>Sponsor</Text>
                    </Pressable>

                    <Pressable 
                        onPress={handleReservarUnidad} 
                        style={({ pressed }) => [styles.button, isDisabled ? styles.disabledButton : styles.reserveButton, pressed && !instrumentInCart && styles.buttonPressed ]}
                        disabled={instrumentInCart} 
                    >
                        <Text style={styles.botonText}>{instrumentInCart ? 'Reservado' : 'Reservar'}</Text>
                    </Pressable>

                </View>

                </FlatCard>

            </View>
        </ImageBackground>
    )
}

export default DetailInstrumentalScreen

const styles = StyleSheet.create({
    containerDetail: {
        flex: 1,
        padding: 10,
        backgroundColor: "transparent",
    },
    backgroundImage: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    card: {
        // Estilos para la FlatCard que contiene toda la información
        padding: 20,
        width: "100%",
        alignItems: "flex-start", // Alinear texto a la izquierda
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
        width: "100%", 
    },
    instrumentImage: {
        width: 100, 
        height: 100, 
        alignSelf: "center",
        marginVertical: 15,
        borderRadius: 8,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        color: "#666",
        flexShrink: 1,
        marginVertical: 4,
    },
    infoBold: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    descriptionSection: {
        marginTop: 15,
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        width:"100%",
        gap:8,
    },
    button: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        width: "30%",
        height:48,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    downloadButton: {
        backgroundColor: "#1E90FF", 
    },
    sponsorButton: {
        backgroundColor: "#FFD700", 
    },
    reserveButton: {
        backgroundColor: "#3CB371",
        
    },
    disabledButton: {
        backgroundColor: "#707070ff", // Un color gris para indicar que está deshabilitado
    },
    botonText:{
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    }
})