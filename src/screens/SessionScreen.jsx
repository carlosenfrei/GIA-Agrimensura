import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Alert,Switch, ScrollView } from 'react-native'

import { colors } from '../theme/color.js'
import { useState, useEffect } from 'react'
import { useAuth } from "../Hooks/useAuth.js";
import { useDispatch } from "react-redux";
import { setUserEmail, setLocalId } from "../store/slices/userSlice.js";

const textInputWidth = Dimensions.get('window').width * 0.7

const SessionScreen = ({navigation}) => {
    const [shouldRemember, setShouldRemember] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rol, setRol] = useState(""); // docente, estudiante
    const { login, signup, loading, error } = useAuth();
    
    const dispatch = useDispatch();

    const handleAuth = async () => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
      if (!email || !password) {
      Alert.alert("Error", "Por favor completa los campos requeridos.");
      return;
      }
      if (isRegistering && !passwordRegex.test(password)) {
        Alert.alert(
          "Error", 
          "La contraseña debe tener al menos 8 caracteres y contener: 1 mayúscula, 1 número y 1 carácter especial (ej: @$!%*?&)."
        );
        return;
      }
        if (isRegistering) {
        if (password !== confirmPassword) {
          Alert.alert("Error", "Las contraseñas no coinciden.");
          return;
        }
        // Verifica campos de registro (opcional, pero buena práctica)
        if (!nombre || !apellido || !telefono || !rol) {
            Alert.alert("Error", "Por favor completa todos los campos de registro.");
            return;
        }

        const user = await signup({ email, password, nombre, apellido, telefono, rol, userType: false});
        if (user) {
          dispatch(setUserEmail(user.email));
          dispatch(setLocalId(user.uid));
          Alert.alert("Éxito", "Registro completado correctamente.");
          // Navegación tras registro
          navigation.navigate('AppTabs'); // Asumiendo que 'AppTabs' es el nombre de tu BottomTabNavigator en MainNavigator
        } else {
            Alert.alert("Error", error || "No se pudo completar el registro.");
        }
      } else {
        const user = await login(email, password, shouldRemember);
        if (user) {
          dispatch(setUserEmail(user.email));
          dispatch(setLocalId(user.uid));
          Alert.alert("Éxito", `¡Bienvenido, ${user.email}!`);
          // Navegación tras login
          navigation.goBack();
        } else {
            Alert.alert("Error", error || 'Correo o contraseña incorrectos.');
        }
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={true}contentInsetAdjustmentBehavior="automatic"> 
      <Text style={styles.title}>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</Text>

      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido completo"
            value={apellido}
            onChangeText={setApellido}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            keyboardType="phone-pad"
            onChangeText={setTelefono}
          />
          <View style={styles.rolContainer}>
            <Pressable onPress={() => setRol("docente")}>
              <Text style={rol === "docente" ? styles.selectedRol : styles.rol}>
                Docente
              </Text>
            </Pressable>
            <Pressable onPress={() => setRol("estudiante")}>
              <Text style={rol === "estudiante" ? styles.selectedRol : styles.rol}>
                Estudiante
              </Text>
            </Pressable>
          </View>
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
          <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
        </Pressable>
      </View>
      {isRegistering && (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar contraseña"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
            <Text style={styles.eyeIcon}>{showConfirmPassword ? "🙈" : "👁️"}</Text>
          </Pressable>
        </View>
      )}

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed ]}  onPress={() => handleAuth()} disabled={loading}>
        <Text style={styles.buttonText}>
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </Text>
      </Pressable>
      {!isRegistering && ( // Solo tiene sentido para el Login
            <View style={styles.rememberMeContainer}>
                <Text style={styles.rememberMeText}>Mantener sesión abierta</Text>
                <Switch
                    trackColor={{ false: "#767577", true: colors.institucional }}
                    thumbColor={shouldRemember ? colors.institucional : "#f4f3f4"}
                    onValueChange={setShouldRemember}
                    value={shouldRemember}
                />
            </View>
        )}

      <Pressable onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering
            ? "¿Ya tienes una cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </Text>
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

export default SessionScreen

const styles = StyleSheet.create({
  container:{
    flex: 1, 
  },
  scrollContainer: {
    flexGrow: 1, 
    padding: 20,
    paddingBottom: 200,
    justifyContent: "center"
  },
  title:{
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  rolContainer:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  rol:{
    fontSize: 16,
    color: "#555"
  },
  selectedRol:{
    fontSize: 16,
    fontWeight: "bold",
    color: colors.institucional
  },
  button: {
    backgroundColor: colors.institucional,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonPressed: {
        backgroundColor: colors.dptoAgrim, 
        opacity: 0.9,
    },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1, // El borde va aquí
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    paddingRight: 6, // Pequeño padding a la derecha para separación visual
  },
  passwordInput: {
    flex: 1, // Es la clave: toma todo el espacio restante
    padding: 10,
    // Eliminamos los bordes internos
  },
  // BOTÓN DEL OJO
  eyeButton: {
    paddingHorizontal: 4, // Padding alrededor del icono
    // Aseguramos que el botón esté centrado verticalmente con respecto al input
    justifyContent: 'center', 

  },
  eyeIcon: {
    fontSize: 20,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  toggleText: { textAlign: "center", color: colors.institucional },
  errorText: { color: "red", textAlign: "center", marginTop: 10 },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 5,
},
rememberMeText: {
    fontSize: 14,
    color: '#555',
},
})