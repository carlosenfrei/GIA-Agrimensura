import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,setPersistence, browserLocalPersistence, browserSessionPersistence} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/db.js";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Registro nuevo usuario
  const signup = async ({ email, password, nombre, apellido, telefono, rol, userType}) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "usuarios", uid), {
        email,
        nombre,
        apellido,
        telefono,
        rol, // "docente" o "estudiante"
        userType,
        createdAt: new Date(),
      });

      return userCredential.user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const login = async (email, password, rememberMe) => { 
        setLoading(true);
        try {
            // 1. Determinar el tipo de persistencia en función del Switch
            const persistenceType = rememberMe 
                ? browserLocalPersistence  // Mantiene la sesión indefinidamente (Switch ON)
                : browserSessionPersistence; // Mantiene la sesión solo en la ejecución actual (Switch OFF)

            // 2. Aplicar la persistencia ANTES de loguear
            await setPersistence(auth, persistenceType);

            // 3. Iniciar sesión
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

  return { signup, login, loading, error };
};