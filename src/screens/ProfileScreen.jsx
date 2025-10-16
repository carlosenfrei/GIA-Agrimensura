import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { colors } from '../theme/color.js';
import Camera from '../components/Camera.jsx'
import { useSelector, useDispatch } from 'react-redux'
import useUserData from '../Hooks/useUserData'; 
import useReservas from '../Hooks/useReservas.js';
import useImageUpload from '../Hooks/useImageUpload';
import { useEffect } from 'react';
import { setProfilePicture } from '../store/slices/userSlice.js'; 


const ProfileScreen = () => {
    const userEmail = useSelector(state => state.userReducer.user);
    const localId = useSelector(state => state.userReducer.localId);
    const { userData, loading: loadingData } = useUserData(localId); 
    const { reservas, loadingReservas } = useReservas(localId);   
    const dispatch = useDispatch();
    const profilePicture = useSelector(state => state.userReducer.profilePicture)
    const { uploadImage } = useImageUpload();
    const pickImage = () => {
        uploadImage(localId); 
    };

    useEffect(() => {
        if (userData && userData.img64 && userData.img64 !== profilePicture) {
            dispatch(setProfilePicture(userData.img64));
        }
    }, [userData, dispatch, profilePicture]);

    if (loadingData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.institucional} />
                <Text>Cargando datos del perfil...</Text>
            </View>
        );
    }
    
    // Si no hay datos (por ejemplo, localId es nulo), mostramos un error/aviso
    if (!userData || !userEmail) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>No hay sesión activa o datos de perfil disponibles.</Text>
            </View>
        );
    }
    const userInitial = userData.nombre ? userData.nombre.charAt(0).toUpperCase() : "?";


    const renderReserva = ({ item }) => (
        <View style={styles.reservaItem}>
            {/*<Text style={styles.reservaTitle}>Instrumento: {item.instrumentoNombre || 'N/A'}</Text>
            Asegúrate de que los campos 'fechaInicio' y 'fechaFin' existan en Firestore 
            <Text style={styles.reservaDetail}>Fecha inicio: {item.fechaInicio || 'N/A'}</Text>
            <Text style={styles.reservaDetail}>Fecha fin: {item.fechaFin || 'N/A'}</Text>*/}
        </View>
    );

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.profileContainer}>
            <View style={styles.profileContainer}>
                <View style={styles.imageProfileContainer}>
                    {profilePicture ? (<Image source={{uri: profilePicture }}style={styles.instrumentImage}resizeMode="contain"/>) :
                    (<Text style={styles.textProfile}>{ userInitial}</Text>)}
                    <Pressable onPress={pickImage} style={({pressed}) => [{opacity: pressed ? 0.90 : 1}, styles.cameraIcon]}>
                        <Camera />
                    </Pressable>
                </View>
                <Text style={styles.profileDataValue}>{userData.nombre || 'N/A'} {userData.apellido || 'N/A'} {userData.rol || 'N/A'}</Text>
                <View style={styles.historySection}>
                    <Text style={styles.historyTitle}>Historial de Reservas</Text>
                    
                    {loadingReservas ? (
                            <ActivityIndicator size="small" color={colors.institucional} />
                        ) : reservas && reservas.length > 0 ? (
                            <FlatList 
                                data={reservas} 
                                keyExtractor={item => item.id} 
                                renderItem={renderReserva}
                                scrollEnabled={false} // Para que la ScrollView externa maneje el scroll
                                style={styles.reservasList}
                            />
                        ) : (
                            <Text style={styles.noDataText}>No tienes reservas registradas en tu historial.</Text>
                        )}
                    <Text>Funcionalidad de historial de reservas pendiente de implementación.</Text>
                </View>

            </View>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    imageProfileContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.institucional,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    textProfile: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: colors.institucional,
        alignSelf: 'flex-start',
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 5,
    },
    profileDataTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    profileDataValue: {
        fontSize: 16,
        color: '#000',
    },
    historySection: {
        marginTop: 40,
        width: '100%',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    reservasList: {
        width: '100%',
    },
    reservaItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: colors.institucional,
    },
    reservaTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
    },
    reservaDetail: {
        fontSize: 14,
        color: '#666',
    },
    noDataText: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
        marginTop: 10,
    }
})