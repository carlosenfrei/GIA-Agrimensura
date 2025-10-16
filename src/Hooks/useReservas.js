import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/db"; // Asegúrate de que este path sea correcto

const useReservas = (userId) => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!userId) {
            setReservas([]);
            return;
        }

        const fetchReservas = async () => {
            setLoading(true);
            try {
                // Asumo que tienes una colección llamada 'reservas' 
                // con un campo que guarda el ID del usuario (ej: 'userId')
                const q = query(
                    collection(db, "reservas"),
                    where("userId", "==", userId)
                );
                const snapshot = await getDocs(q);
                
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReservas(data);

            } catch (error) {
                console.error("Error al obtener reservas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [userId]);

    return { reservas, loading };
};

export default useReservas;