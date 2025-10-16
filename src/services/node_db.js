// Importa las funciones necesarias para Node.js (firebase/app y firebase/firestore)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// NO necesitas initializeAuth para subir datos, y NO uses expo-constants o AsyncStorage.

// ⚠️ Debes obtener tus credenciales de Firebase de forma segura.
// Por ejemplo, cargándolas directamente o desde variables de entorno.
// Reemplaza los placeholders con tu configuración real de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyCdQ5LYSfLqgGbsXu3QaTzlIYKRGmOY55g",
  authDomain: "gia-agrimensura-001.firebaseapp.com",
  projectId: "gia-agrimensura-001",
  storageBucket: "gia-agrimensura-001.firebasestorage.app",
  messagingSenderId: "456096534563",
  appId: "1:456096534563:web:9e810be8e1591cdbbc2196"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos solo la base de datos, ya que no necesitamos autenticación para el seed
export { db };