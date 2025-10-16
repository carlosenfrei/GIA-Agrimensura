import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/db"; // Asegúrate de que el path a 'db' sea correcto

const useUserData = (localId) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Detener la ejecución si no hay ID de usuario
        if (!localId) {
            setUserData(null);
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            try {
                // Referencia al documento del usuario usando su UID
                const docRef = doc(db, "usuarios", localId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    //console.log("No se encontraron datos de usuario en Firestore.");
                    setUserData(null);
                }
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();

    }, [localId]);

    return { userData, loading };
};

export default useUserData;