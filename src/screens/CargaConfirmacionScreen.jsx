import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import useUserData from '../Hooks/useUserData';
import { doc, collection, addDoc } from 'firebase/firestore';
import { db } from '../services/db';
import { colors } from '../theme/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { generarPDF } from '../components/GenerarPDF';
import { useState } from 'react';


const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const InputGroup = ({ label, value, onChangeText, placeholder }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        />
    </View>
);

const CargaConfirmacionScreen = ({navigation, route}) => {
    const { cartItems = [], userData: passedUserData } = route.params || {};
    const localId = useSelector((state) => state.userReducer.localId);
    const { userData: firestoreUser, loading: loadingUserData } = useUserData(localId);

    const userData = passedUserData || firestoreUser;

    const [materia, setMateria] = useState("");
    const [codigoMateria, setCodigoMateria] = useState("");
    const [tipoDePractica, setTipoDePractica] = useState("");
    const [lugarDePractica, setLugarDePractica] = useState("");
    const [fechaRetiro, setFechaRetiro] = useState(new Date());
    const [fechaDevolucion, setFechaDevolucion] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [currentDateType, setCurrentDateType] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const esDocente = userData?.rol === 'Docente';
    const dispatch = useDispatch(); 
    const showDatepicker = (type) => {
        setCurrentDateType(type);
        setShowPicker(true);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate =
        selectedDate ||
        (currentDateType === 'retiro' ? fechaRetiro : fechaDevolucion);

        setShowPicker(false);

        if (event.type === 'set') {
        if (currentDateType === 'retiro') {
            setFechaRetiro(currentDate);
        } else if (currentDateType === 'devolucion') {
            setFechaDevolucion(currentDate);
        }
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        });
    };

    const handleSaveReservation = async () => {
        if (!fechaRetiro || !fechaDevolucion || (esDocente && (!materia || !codigoMateria))) {
            Alert.alert('Faltan datos', 'Debes completar todos los campos obligatorios.');
            return;
        }

        if (fechaDevolucion < fechaRetiro) {
        Alert.alert('Fechas inválidas', 'La fecha de devolución no puede ser anterior al retiro.');
        return;
        }

        setIsSubmitting(true);

        try {
        const reservaData = {
            userId: localId,
            userName: `${userData.nombre} ${userData.apellido}`,
            userEmail: userData.email || 'N/A',
            userRole: userData.rol,
            fechaCreacion: new Date().toISOString(),
            fechaRetiro: fechaRetiro.toISOString().split('T')[0],
            fechaDevolucion: fechaDevolucion.toISOString().split('T')[0],
            materia: esDocente ? materia : null,
            codigoMateria: esDocente ? codigoMateria : null,
            tipoDePractica: esDocente ? tipoDePractica : null,
            lugarDePractica: esDocente ? lugarDePractica : null,
            instrumentosReservados: cartItems.map(item => ({
            ID: item.ID,
            categoria: item.Categoria,
            subcategoria: item.SubCategoria,
            unidad: item.unidad,
            Marca: item.Marca,
            Modelo: item.Modelo,
            Patrimonio: item.Patrimonio || item.Numero_de_Serie || 'N/A',
            })),
            estado: 'Pendiente de aprobación',
        };

        await addDoc(collection(db, "reservas"), reservaData);
        Alert.alert('Reserva exitosa', 'Tu solicitud fue enviada y está pendiente de aprobación.');
        dispatch(clearCart());
        await generarPDF(reservaData);
        navigation.navigate("Categorias");
        } catch (error) {
        console.error("Error al guardar la reserva:", error);
        Alert.alert(" Hubo un problema al intentar guardar la reserva.");
        } finally {
        setIsSubmitting(false);
        }
    };

    if (loadingUserData || isSubmitting) {
        return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.institucional} />
            <Text>{isSubmitting ? 'Confirmando reserva...' : 'Cargando datos de usuario...'}</Text>
        </View>
        );
    }

    if (cartItems.length === 0) {
        return (
        <View style={styles.centerContainer}>
            <Text style={styles.infoText}>No hay instrumentos en el carrito para confirmar.</Text>
            <Pressable onPress={() => navigation.navigate('Categorias')} style={styles.returnButton}>
            <Text style={styles.returnButtonText}>Volver al Inicio</Text>
            </Pressable>
        </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Datos de Reserva</Text>
            
            {/* Sección de Datos del Usuario (No modificables) */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Datos del Solicitante</Text>
                <InfoRow label="Nombre Completo" value={`${userData?.nombre || ''} ${userData?.apellido || ''}`} />
                <InfoRow label="Correo Electrónico" value={userData?.email || 'N/A'} />
                <InfoRow label="Rol" value={userData?.rol || 'N/A'} />
            </View>

            {/* Campos Específicos para Docentes */}
            {esDocente && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información de Docencia (Obligatorio)</Text>
                    <InputGroup label="Materia (*)" value={materia} onChangeText={setMateria} placeholder="Ej: Sistemas de representacion orientado a la Agrimensura" />
                    <InputGroup label="Código de Materia (*)" value={codigoMateria} onChangeText={setCodigoMateria} placeholder="Ej: CB105" />
                    <InputGroup label="Tipo de Practica (*)" value={tipoDePractica} onChangeText={setTipoDePractica} placeholder="Ej: nivelacion, relevamiento, replanteo" />
                    <InputGroup label="Lugar de Practica (*)" value={lugarDePractica} onChangeText={setLugarDePractica} placeholder="Ej: Plaza MItre" />
                </View>
            )}

            {/* Campos de Fechas (Obligatorios) */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Fechas de Retiro y Devolución (*)</Text>
                
                {/* Campo de Retiro */}
                <Pressable onPress={() => showDatepicker('retiro')} style={styles.datePickerButton}>
                    <Text style={styles.datePickerLabel}>Fecha de Retiro:</Text>
                    <Text style={styles.datePickerValue}>{formatDate(fechaRetiro)}</Text>
                </Pressable>

                {/* Campo de Devolución */}
                <Pressable onPress={() => showDatepicker('devolucion')} style={styles.datePickerButton}>
                    <Text style={styles.datePickerLabel}>Fecha de Devolución:</Text>
                    <Text style={styles.datePickerValue}>{formatDate(fechaDevolucion)}</Text>
                </Pressable>
            </View>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={currentDateType === 'retiro' ? fechaRetiro : fechaDevolucion}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Mejor UX en iOS
                    onChange={handleDateChange}
                    minimumDate={new Date()} // No permitir seleccionar fechas pasadas
                />
            )}
            
            {/* Resumen del Carrito */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pedido de instrumentos ({cartItems.length})</Text>
                {cartItems.map((item, index) => {
                    const identificador =
                    item.Patrimonio && item.Patrimonio !== 'sin dato'
                        ? `Patrimonio: ${item.Patrimonio}`
                        : item.Numero_de_Serie && item.Numero_de_Serie !== 'sin dato'
                        ? `N° Serie: ${item.Numero_de_Serie}`
                        : 'sin dato';

                    return (
                    <Text key={index} style={styles.itemSummary}>
                        <Ionicons name="checkmark-outline" size={14} color={colors.institucional} />{' '}
                        {item.Categoria} - {item.SubCategoria} - {item.Marca} - {item.Modelo} -{identificador}
                    </Text>
                );
                })}
            </View>

            {/* Botón de Confirmación */}
            <Pressable onPress={handleSaveReservation} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" /> Confirmar y Enviar Solicitud
                </Text>
            </Pressable>
            
        </ScrollView>
    )
}

export default CargaConfirmacionScreen

const styles = StyleSheet.create({
 container: {
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: colors.institucional,
    },
    section: {
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 15,
        backgroundColor: "#fff",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    infoRow: {
        flexDirection: "row",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    infoLabel: {
        fontWeight: "bold",
        marginRight: 10,
        color: "#555",
    },
    infoValue: {
        color: "#000",
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
    },
    itemSummary: {
        fontSize: 14,
        marginBottom: 5,
        color: "#555",
        marginLeft: 5,
    },
    confirmButton: {
        backgroundColor: colors.institucional,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    confirmButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    infoText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    returnButton: {
        backgroundColor: colors.texto2,
        padding: 10,
        borderRadius: 5,
    },
    returnButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    datePickerButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
    },
    datePickerLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    datePickerValue: {
        fontSize: 16,
        color: colors.institucional,
        fontWeight: "bold",
    },
})